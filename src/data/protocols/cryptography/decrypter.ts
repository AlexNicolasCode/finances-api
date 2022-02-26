import { JwtDecrypted } from "src/domain/models";

export interface Decrypter {
    decrypt: (plaintext: string) => Promise<Decrypter.Result>
}

export namespace Decrypter {
    export type Result = JwtDecrypted
}