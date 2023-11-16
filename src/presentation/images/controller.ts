import { Request, Response } from "express";
import path from "path";
import fs from "fs";

export class ImgController {
    constructor(){}

    getImg = (req: Request, res: Response) => {
        const {type = '', img = ''} = req.params;

        const pathFile = path.resolve(__dirname, `../../../uploads/${type}/${img}`);

        if (!fs.existsSync(pathFile)) return res.status(400).json({error: "Img don't Exist"})
        
        res.sendFile(pathFile)
    }
}