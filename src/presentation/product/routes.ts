import { Router } from "express";
import { ProductController } from "./controller";
import { ServiceProduct } from "../services/product.service";

export class ProductRoutes {
    constructor(){}


    static get routes(): Router {
        const router = Router();

        const productService = new ServiceProduct()
        const productsController = new ProductController(productService)

        router.get('/', productsController.getProducts)
        router.post('/', productsController.createProducts)

        return router;
    }
}