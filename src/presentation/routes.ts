import { Router } from 'express';
import { AuthRoutes } from './auth/routes';
import { CategoryRoutes } from './category/routes';
import { ProductRoutes } from './product/routes';
import { AuthMiddleware } from './middlewares/auth.moddleware';
import { FileUploadRoutes } from './file-upload/routes';
import { ImagesRoutes } from './images/routes';




export class AppRoutes {


  static get routes(): Router {

    const router = Router();
    // Definer las routes
    router.use('/api/v1/auth', AuthRoutes.routes );
    router.use('/api/v1/category', [AuthMiddleware.validateJwt],  CategoryRoutes.routes );
    router.use('/api/v1/product', [AuthMiddleware.validateJwt], ProductRoutes.routes );
    router.use('/api/v1/upload', FileUploadRoutes.routes )
    router.use('/api/v1/images', ImagesRoutes.routes)


    return router;
  }


}

