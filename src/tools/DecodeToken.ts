import * as jwt from 'jsonwebtoken';

export const decodeToken = (token) => {
    try {
        return jwt.verify(token, process.env.SECRET)
    } catch {
        return undefined
    }
}