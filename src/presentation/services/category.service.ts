import { CategoryModel } from "../../data";
import { CreateCategoryDto, CustomError, UserEntity } from "../../domain";
import { CategoryEntity } from "../../domain/entities/category.entity";

export class CategoryService {
    
    constructor(){}

    async getCategory(){
        const category = await CategoryModel.find({});
        const transformData = category.map(item => { 
            return {
                id: item.id,
                name: item.name,
                available: item.available,
            }
        })
        return transformData;
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