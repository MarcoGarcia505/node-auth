import { Router } from "express";
import { CategoryController } from "./controller";
import { CategoryService } from "../services/category.service";



export class CategoryRoutes {
    constructor(){}

    static get routes(): Router {
        const router = Router()
        
        const categoryService = new CategoryService();
        const categoryController = new CategoryController(categoryService)

        router.get('/', categoryController.getCategories)
        router.post('/', categoryController.createCategories)

        return router;
    }
}