

export class CreateCategoryDto {
    constructor(
        public readonly name: string,
        public readonly available: boolean
    ){}


    static create(props: {[key:string]: any}): [string?, CreateCategoryDto?] {
        const {name, available = false} = props;

        let changeAvailable = available;

        if (!name) return ['Name is required'];
        if (typeof available !== 'boolean') {
            changeAvailable = true
        }

        console.log(typeof available !== 'boolean');
        console.log("type", changeAvailable);
        
        

        return [undefined, new CreateCategoryDto(name, changeAvailable)]
    }
}