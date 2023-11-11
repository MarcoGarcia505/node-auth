import { Request, Response } from "express";
import { CustomError } from "../../domain";



export class ProductController {
    constructor(){}


    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({error: error.message})
        }
        
        console.log(error);
        res.status(500).json({error: 'Internal Server Error'})
    }

    getProducts(req: Request, res: Response){

    }
    
    createProducts(req: Request, res: Response){

    }
}