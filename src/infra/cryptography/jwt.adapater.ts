import * as jwt from 'jsonwebtoken';

import { Decrypter, Encrypter } from "src/data/protocols";

export class JwtAdapter implements Encrypter, Decrypter {
    constructor (private readonly secret: string) {}

    async encrypt (plaintext: string): Promise<string> {
        return jwt.sign(
            { email: plaintext }, 
            this.secret, 
            { expiresIn: 60 * 60 * 24 * 30 }
        );
    }

    async decrypt (ciphertext: string): Promise<Decrypter.Result> {
        const decryptedToken = await jwt.verify(ciphertext, this.secret) as Decrypter.Result
        return decryptedToken
    }
}