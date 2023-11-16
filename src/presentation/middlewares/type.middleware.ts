import { NextFunction, Request, Response } from "express";

export class TypeMiddleware {
    static validateTypes(type: string[]){
        return (req: Request, res: Response, next: NextFunction) => {
            console.log(req.url);
            
            // const { polder } = req.params.split("/").at(2) ?? ""
            const polder = req.url.split("/").at(2) ?? ""
             
            console.log(polder);
            
            if (!type.includes(polder)) {
                return res.status(400).json({error: "path not valid"})
            }

            next()
        }
    }
}