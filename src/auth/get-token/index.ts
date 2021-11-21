import * as jwt from 'jsonwebtoken';

export const getToken = (email) => jwt.sign({ email }, process.env.SECRET, {
    expiresIn: 60 * 60 * 24 * 30
});