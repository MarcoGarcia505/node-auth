import { Validators } from "../../../config/validators";

export class CreateProductDto {
    constructor(
        public readonly name: string,
        public readonly avaliable: boolean,
        public readonly price: number,
        public readonly description: string,
        public readonly user: string, // ID
        public readonly category: string, // ID
    ){}


    static create(prop: {[key: string]: any}): [string?, CreateProductDto?]{
        const {name, avaliable, price, description, user, category} = prop;


    if (!name) return ['Name is required']
    if (!user) return ['user is required']
    if (!category) return ['category is required']
    if (!Validators.isMongoId(user)) return ['user is not a id valid']
    if (!Validators.isMongoId(category)) return ['category is not a id valid']

        return [undefined, new CreateProductDto(name, !!avaliable, price, description, user, category)]
    }


}