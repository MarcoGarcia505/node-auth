import { Router } from "express";
import { FileUploadController } from "./controller";
import { FileUploadService } from "../services/file-upload.service";
import { UploadFileMiddleware } from "../middlewares/upload-file.middleware";
import { TypeMiddleware } from "../middlewares/type.middleware";

export class FileUploadRoutes{
    static get routes(): Router{
        const router = Router()

        const fileUploadService = new FileUploadService()
        const fileUploadController = new FileUploadController(fileUploadService)



        router.use(UploadFileMiddleware.containFiles)
        router.use(TypeMiddleware.validateTypes(['users', 'products', 'categories']))
        
        router.post('/single/:polder', fileUploadController.uploadFiles)
        router.post('/multiple/:polder', fileUploadController.uploadMultipleFiles)


        return router;
    }
}