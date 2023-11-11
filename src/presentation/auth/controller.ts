import { Request, Response, Router } from "express";
import { CustomError, LoginUserDto, RegisterUserDto } from "../../domain";
import { AuthService } from "../services/auth.service";


export class AuthController {
    constructor(
        public readonly authService: AuthService
    ){
    }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({error: error.message})
        }
        
        console.log(error);
        res.status(500).json({error: 'Internal Server Error'})
    }

    loginUser = (req: Request, res: Response) => {
        const [error, loginUserDto] = LoginUserDto.create(req.body)
        if (error) return res.json(400).json({error})

        this.authService.loginUser(loginUserDto!)
            .then(data => {
                res.json(data);
            })
            .catch(error => {
                this.handleError(error, res);
            })
    }

    registerUser = (req: Request, res: Response) => {
        const [error, registerUserDto] = RegisterUserDto.create(req.body)
        if (error) return res.json(400).json({error})

        this.authService.registerUser(registerUserDto!).then(info => {
            res.json(info)
        }).catch((error) => {
            this.handleError(error, res);
        })
    }

    validateEmail = (req: Request, res: Response) => {
        const {token} = req.params
        this.authService.validateEmail(token).then(data => {
            res.json({coco: "validate-token", data})
        }).catch(error => {
            this.handleError(error, res)
        })
    }
}