import { Router } from "express";
import { AuthController } from "./controller";
import { AuthService } from "../services/auth.service";
import { EmailService } from "../services/email.service";
import { envs } from "../../config";


export class AuthRoutes {
    constructor(){}
    

    static get routes(): Router {
        const router = Router();

        const emailService = new EmailService(
            envs.MAILER_SERVICE,
            envs.MAILER_EMAIL,
            envs.MAILER_SECRET_KEY
        );

        const authService = new AuthService(emailService);
        
        const authController = new AuthController(authService);

        router.post('/login', authController.loginUser);
        router.post('/register', authController.registerUser);

        router.get('/validate-token/:token', authController.validateEmail);

        return router;

    }
}