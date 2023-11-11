import { regularExps } from "../../../config";


export class LoginUserDto {
    constructor(
        public readonly email: string, 
        public readonly password: string 
    ){}

    static create(options: {[key:string]: any}): [string?, LoginUserDto?]{
        const { email, password } = options;
        if (!regularExps.email.test(email)) return ['Missing email']
        if (!password) return ['Missing password']

        return [undefined, new LoginUserDto(email, password)]
    }
}