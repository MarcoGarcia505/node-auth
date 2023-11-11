
import { JwtAdapter, bcryptAdapter, envs } from "../../config";
import { userModel } from "../../data";
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";
import { EmailService } from "./email.service";


export class AuthService {
    constructor(
        private readonly emailService: EmailService
    ) { }


    public async loginUser(loginUserDto: LoginUserDto) {
        const logUser = await userModel.findOne({ email: loginUserDto.email });
        if (!logUser) throw CustomError.forbidden('Credential invalid');


        const comparePassword = bcryptAdapter.compare(loginUserDto.password, logUser.password!);

        if (!comparePassword) throw CustomError.unauthorized('Error with Password');

        const { password, ...infoUser } = UserEntity.fromObject(logUser);

        const token = await JwtAdapter.generateToken({ id: infoUser.id });
        if (!token) throw CustomError.internalServer('not created token');

        return {
            user: infoUser,
            token: token
        };
    }

    public async registerUser(registerUserDto: RegisterUserDto) {
        const searchByEmail = await userModel.findOne({ email: registerUserDto.email });
        if (searchByEmail) throw CustomError.badRequest("this email exist");

        // Option One1
        try {
            const newUser = new userModel(registerUserDto);
            newUser.password = bcryptAdapter.hash(registerUserDto.password);
            await newUser.save();

            await this.sendValidatorToken(newUser.email!)

            const { password, ...dataUser } = UserEntity.fromObject(newUser);

            return {
                user: dataUser,
            };

        } catch (error) {
            throw CustomError.badRequest('bab information');
        }

        // Option Two2
        // const register = await userModel.create({
        //     name, 
        //     email, 
        //     password
        // });
    }

    public async sendValidatorToken(email: string) {
        const createToken = await JwtAdapter.generateToken({ email });
        if (!createToken) throw CustomError.internalServer('Error getting token');

        const URL_INFORMATION = `${envs.WEBSERVER_URL}/api/v1/auth/validate-token/${createToken}`;

        const htmlBody = `
            <h1>Verification of Email</h1>
            <p>
                En Mozilla, somos una comunidad de tecnólogos, pensadores, y constructores quetrabajan juntos...
            </p>
            <a href="${URL_INFORMATION}">Validate Now</a>
        `;

        const sendStatus = await this.emailService.sendEmail({
            to: email,
            subject: "Validate Email",
            htmlBody: htmlBody,
            attachments: []
        });

        if(!sendStatus) throw CustomError.internalServer('One Error in send message')
        return true;
    }


    public async validateEmail(token: string) {
        const validate = await JwtAdapter.validateToken(token);
        if (!token) throw CustomError.unauthorized("Token Not Valid");
        const {email} = validate as {email: string};
        if(!email) throw CustomError.internalServer("Email not in token")

        const findUserByEmail = await userModel.findOne({
            email: email
        })
        if (!findUserByEmail) throw CustomError.internalServer("User not exist")

        findUserByEmail.emailValidate = true;
        await findUserByEmail.save();
    }
}
