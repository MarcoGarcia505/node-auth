import { Request, Response } from "express";
import { FileUploadService } from "../services/file-upload.service";
import { UploadedFile } from "express-fileupload";

export class FileUploadController {
    constructor(
        private readonly fileUploadService: FileUploadService
    ){}


    uploadFiles = (req: Request, res: Response) => {
        const { polder } = req.params

        const file = req.body.files[0];
        console.log(file);
        

        this.fileUploadService.uploadSingle(file, `uploads/${polder}`).then(data => {
            res.json({msm: "save", data})
        }).catch(error => {
            res.status(400).json({error})
        })
}

    uploadMultipleFiles = (req: Request, res: Response) => {
         const { polder } = req.params
        
        const files = req.body.files[0];
        console.log("data information",files);

        this.fileUploadService.uploadMultiple(files, `uploads/${polder}`).then(data => {
            res.json({msm: "save", data})
        }).catch(error => {
            res.status(400).json({error})
        })
    }
}