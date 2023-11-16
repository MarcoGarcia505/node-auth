import { CategoryModel } from "../../data";
import { CreateCategoryDto, CustomError, PaginationDto, UserEntity } from "../../domain";
import { CategoryEntity } from "../../domain/entities/category.entity";

export class CategoryService {
    
    constructor(){}

    async getCategory(paginationDto: PaginationDto){

        const {page, limit} = paginationDto;
        
        const [count, categories] = await Promise.all([
            CategoryModel.countDocuments(),
            CategoryModel.find({}).skip((page - 1 ) * limit).limit(limit),
        ])     
        
        return {
            page: page,
            limit: limit, 
            total: count,
            total_pages: (+count % +limit !== 0) ? +((+count/limit).toFixed())+1 : (+count / limit),
            next: `/api/v1/category?page=${ ( page + 1 ) }&limit=${ limit }`,
            prev: ((page - 1) > 0) ? `/api/v1/category?page=${ ( page - 1 ) }&limit=${ limit }` : null,
            category: categories.map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    available: item.available,
                }
            })
        }
    }

    async createCategory(createCategoryDto: CreateCategoryDto, user: UserEntity){

        const findCategory = await CategoryModel.findOne({name: createCategoryDto.name});
        if (findCategory) throw  CustomError.badRequest("This category exist");


        try {
            const create = new CategoryModel({
                ...createCategoryDto,
                user: user.id
            });
            await create.save()
            
            return {
                id: create.id,
                name: create.name,
                available: create.available,
            }           
        } catch (error) {
            console.log(error);
            throw CustomError.internalServer("One error with the user register");
            
        }
    }
}