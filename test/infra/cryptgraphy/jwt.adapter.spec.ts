import faker from '@faker-js/faker'
import * as jwt from 'jsonwebtoken'

import { JwtAdapter } from 'src/infra/cryptography'

jest.mock('jsonwebtoken', () => ({
    async sign (): Promise<string> {
        return 'any_token'
    },

    async verify (): Promise<string> {
        return 'any_value'
    }
}))

const makeSut = (): JwtAdapter => {
    return new JwtAdapter('secret')
} 

describe('JwtAdapter', () => {
    describe('sign()', () => {
        test('Should call jwt.sign with params', async () => {
            const sut = makeSut()
            const signSpy = jest.spyOn(jwt, 'sign')

            await sut.encrypt('any_id')

            expect(signSpy).toHaveBeenCalledWith({ id: 'any_id'}, 'secret', { expiresIn: 60 * 60 * 24 * 30 })
        })

        test('Should return accessToken on success', async () => {
            const sut = makeSut()

            const accessToken = await sut.encrypt('any_id')

            expect(accessToken).toBe('any_token')
        })
    })
})