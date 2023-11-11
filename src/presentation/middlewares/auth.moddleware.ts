import { NextFunction, Request, Response } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import { JwtAdapter } from "../../config";
import { userModel } from "../../data";

export class AuthMiddleware {

    static async validateJwt (req: Request, res: Response, next: NextFunction){
        const authorization = req.header("Authorization");
        // console.log(req.headers);
        // console.log(req.header("Authorization"));
        
        if(!authorization) return res.status(401).json({error: "not fount parameter authorization"});
        if (!authorization.startsWith("Bearer ")) return res.status(400).json({error: "Invalid Barer token"})
        
        const token = authorization.split(" ").at(1);

        try {
            const validateToken = await JwtAdapter.validateToken<{id: string}>(token!)
            if (!validateToken) return res.status(401).json({error: "token not valid"})

            const user = await userModel.findById(validateToken.id);
            if (!user) return res.status(404).json({error: "User not found"});

            req.body.user = user;
            
            next();
        } catch (error) {
            console.log(error);
            res.status(500).json({error: "error getting the token"});
        }
    }
}