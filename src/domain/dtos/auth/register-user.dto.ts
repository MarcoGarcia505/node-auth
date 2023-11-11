import { regularExps } from "../../../config";


export class RegisterUserDto {
    constructor(
        public readonly name: string, 
        public readonly email: string, 
        public readonly password: string 
    ){}

    static create(options: {[key:string]: any}): [string?, RegisterUserDto?]{
        const { name, email, password } = options;
        if (!name) return ['Missing name']
        if (!regularExps.email.test(email)) return ['Missing email']
        if (!password) return ['Missing password']
        if (password.length < 6) return ['its short this password']

        return [undefined, new RegisterUserDto(name, email, password)]
    }
}