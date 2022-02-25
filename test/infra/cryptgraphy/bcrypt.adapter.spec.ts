import * as bcrypt from 'bcrypt'

import { BycryptApapter } from 'src/infra/cryptography'

jest.mock('bcrypt', () => ({
    async hash (): Promise<string> {
        return 'hash'
    },
}))

describe('BcryptAdapter', () => {
    describe('hash', () => {
        test('Should call hash method with correct params', async () => {
            const salt = 12
            const sut = new BycryptApapter(salt)
            const hashSpy = jest.spyOn(bcrypt, 'hash')

            await sut.hash('any_value')

            expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
        })
    })
})