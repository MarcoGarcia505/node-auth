import jwt from 'jsonwebtoken'
import { envs } from './envs';

const JWT_SEED = envs.JWT_SEED;

export class JwtAdapter {
    static async generateToken(payload: any, duration: string = '2h'){
        return new Promise((resolve) => {
            jwt.sign(payload, JWT_SEED, {expiresIn: duration}, (error, token) => {
                if (error) return resolve(null);
                resolve(token)
            })
        })
    }
    // Using generics "<>" of typeScript
    static validateToken<T>(token:string): Promise<T | null>{
        return new Promise((resolve, reject) => {
            jwt.verify(token, envs.JWT_SEED, (error, decoded) => {
                if (error) return resolve(null);
                resolve(decoded as T);
            })
        })
    }
}