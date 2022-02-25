import faker from '@faker-js/faker'
import * as jwt from 'jsonwebtoken'

import { JwtAdapter } from 'src/infra/cryptography'

jest.mock('jsonwebtoken', () => ({
    async sign (): Promise<string> {
        return faker.datatype.string(5)
    },

    async verify (): Promise<string> {
        return faker.datatype.string(5)
    }
}))

describe('JwtAdapter', () => {
    describe('sign()', () => {
        test('Should call jwt.sign with params', async () => {
            const sut = new JwtAdapter('secret')
            const signSpy = jest.spyOn(jwt, 'sign')

            await sut.encrypt('any_id')

            expect(signSpy).toHaveBeenCalledWith({ id: 'any_id'}, 'secret', { expiresIn: 60 * 60 * 24 * 30 })
        })
    })
})