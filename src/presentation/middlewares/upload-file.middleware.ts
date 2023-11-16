import { NextFunction, Request, Response } from "express";

export class UploadFileMiddleware{
    static containFiles(req: Request, res:Response, next: NextFunction){
        
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({error: "Selected a file"})
        }

        console.log(req.files);
        

        if (!Array.isArray(req.files)) {
            req.body.files = [req.files.file]
        }else {
            req.body.files = req.files.file
        }
        
        next()
    }
}