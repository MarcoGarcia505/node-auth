import { UploadedFile } from "express-fileupload";
import fs from "fs";
import path from "node:path";
import { Uuid } from "../../config/uuid.adapter";
import { CustomError } from "../../domain";

export class FileUploadService {
    constructor(
        private readonly uuid = Uuid.v4
    ){}

    private checkFolder(pathFolder: string){
        if (!fs.existsSync(pathFolder)){
            fs.mkdirSync(pathFolder)
        }
    }


    async uploadSingle(file: UploadedFile, folder: string = 'uploads', validateExtension: string[] = ['png', 'jpg', 'jpeg', 'gif']){
        try {
            const extensionImg = file.mimetype.split("/").at(1) ?? "";

            if (!validateExtension.includes(extensionImg)) throw CustomError.badRequest("Extension not valid")

            const pathFile = path.resolve( __dirname, '../../../', folder);
            const fileName = `${this.uuid()}.${extensionImg}`;
            this.checkFolder(pathFile);
            
            file.mv(`${pathFile}/${fileName}`);
            
            return fileName;
        } catch (error) {
            console.log(error);
            throw CustomError.internalServer("Error really big")
            
        }
    }

    async uploadMultiple(files: UploadedFile[], folder: string = 'uploads', validateExtension: string[] = ['png', 'jpg', 'jpeg', 'gif']){
        try {
            const infoUpload = await Promise.all(
                files.map(item => this.uploadSingle(item, folder, validateExtension))
            )

            return infoUpload;
        } catch (error) {
            console.log(error);
            throw CustomError.internalServer("Error in upload")
        }


    }
}