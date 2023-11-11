import { Router } from 'express';
import { AuthRoutes } from './auth/routes';
import { CategoryRoutes } from './category/routes';
import { ProductRoutes } from './product/routes';
import { AuthMiddleware } from './middlewares/auth.moddleware';




export class AppRoutes {


  static get routes(): Router {

    const router = Router();
    // Definer las routes
    router.use('/api/v1/auth', AuthRoutes.routes );
    router.use('/api/v1/category', [AuthMiddleware.validateJwt],  CategoryRoutes.routes );
    router.use('/api/v1/product', [AuthMiddleware.validateJwt], ProductRoutes.routes );



    return router;
  }


}

