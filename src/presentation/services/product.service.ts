import { ProductModel, userModel } from "../../data";
import { CreateProductDto, CustomError, PaginationDto } from "../../domain";

export class ServiceProduct {
    constructor(){}

    async getAllProducts(paginationDto: PaginationDto){
        const {page, limit} = paginationDto;

        const [count, products] = await Promise.all([
            ProductModel.countDocuments(),
            ProductModel
                .find({}) // return all data
                .skip((page - 1) * limit) // jump the registers
                .limit(limit) // limit of register that return
                .populate('user') // if we have relations with other models, we can call that models and get the information del model
                .populate('category') // if we have relations with other models, we can call that models and get the information del model
        ])
        
        return {
            page: page,
            limit: limit, 
            total: count,
            total_pages: (+count % +limit !== 0) ? +((+count/limit).toFixed())+1 : (+count / limit),
            next: `/api/product?page=${ ( page + 1 ) }&limit=${ limit }`,
            prev: ((page - 1) > 0) ? `/api/product?page=${ ( page - 1 ) }&limit=${ limit }` : null,
            category: products
        }
    }

    async createProduct(product: CreateProductDto) {
        const findProduct = await ProductModel.findOne({name: product.name});
        if (findProduct) throw CustomError.badRequest("This element Exist");


        try {
            const newProduct = new ProductModel({...product})
            await newProduct.save()

            return newProduct;
        } catch (error) {
            console.log(error);
            throw CustomError.internalServer("One error with the user register");
            
        }
    }
}