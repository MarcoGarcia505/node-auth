import { Router } from "express";

export class ProductRoutes {
    constructor(){}


    static get routes(): Router {
        const router = Router();

        router.get('/')
        router.post('/')

        return router;
    }
}