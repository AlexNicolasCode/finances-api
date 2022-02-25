import * as bcrypt from 'bcrypt';

import { HashComparer, Hasher } from "src/data/protocols";

export class BycryptApapter implements Hasher, HashComparer {
    constructor (private readonly salt: number) {}

    async hash (plaintext: string): Promise<string> {
        return bcrypt.hash(plaintext, this.salt)
    }

    async compare (plaintext: string, digest: string): Promise<boolean> {
        return bcrypt.compare(plaintext, digest)
    }
}