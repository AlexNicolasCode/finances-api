import faker from '@faker-js/faker'

import { Hasher } from 'src/data/protocols'

export class HasherSpy implements Hasher {
    digest = faker.datatype.uuid()
    plaintext: string

    async hash (plaintext: string): Promise<string> {
        this.plaintext = plaintext
        return this.digest
    }
}