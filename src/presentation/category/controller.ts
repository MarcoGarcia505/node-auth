import { Request, Response } from "express";
import { CustomError, PaginationDto } from "../../domain";
import { CreateCategoryDto } from "../../domain";
import { CategoryService } from "../services/category.service";

export class CategoryController {
    constructor(
        public readonly categoryService: CategoryService
    ){}

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({error: error.message})
        }
        
        console.log(error);
        res.status(500).json({error: 'Internal Server Error'})
    }

    getCategories = (req: Request, res: Response) => {
        
        const {limit, page} = req.query;

        
        const [error, paginationDto] = PaginationDto.create(+page!, +limit!);
        
        if(error) return res.status(400).json({error});

        this.categoryService.getCategory(paginationDto!).then(item => {
            res.json(item);
        }).catch(error => {
            this.handleError(error, res)
        });
    }

    createCategories = (req: Request, res: Response) => {
        const [error, createCategoryDto] = CreateCategoryDto.create(req.body);

        if(error) return res.status(401).json(error);

        this.categoryService.createCategory(createCategoryDto!, req.body.user).then(data => {
            res.json(data)
        }).catch(error => {
            this.handleError(error, res)
        })

    }
}