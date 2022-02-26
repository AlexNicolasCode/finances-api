import faker from '@faker-js/faker'

import { Encrypter, HashComparer, Hasher } from 'src/data/protocols'

export class HasherSpy implements Hasher {
    digest = faker.datatype.uuid()
    plaintext: string

    async hash (plaintext: string): Promise<string> {
        this.plaintext = plaintext
        return this.digest
    }
}

export class HashComparerSpy implements HashComparer {
    digest: string
    plaintext: string
    isValid = true

    async compare (plaintext: string, digest: string): Promise<boolean> {
        this.plaintext = plaintext
        this.digest = digest
        return this.isValid
    }
}

export class EncrypterSpy implements Encrypter {
    plaintext: string
    ciphertext = faker.datatype.uuid()

    async encrypt (plaintext: string): Promise<string> {
        this.plaintext = plaintext
        return this.ciphertext
    }
}