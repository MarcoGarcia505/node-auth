import { Router } from "express";
import { ImgController } from "./controller";

export class ImagesRoutes {
    static get routes(): Router {
        const route = Router();

        const imgController = new ImgController();
        
        route.get("/:type/:img", imgController.getImg)

        return route;
    }
}