import * as jwt from 'jsonwebtoken';
import { UserNoSecretData } from 'src/types/modals';

export const decodeToken = (token: string) => {
    try {
        return jwt.verify(token, process.env.SECRET) as UserNoSecretData
    } catch {
        return undefined
    }
}