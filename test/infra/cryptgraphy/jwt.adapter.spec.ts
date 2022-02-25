import faker from '@faker-js/faker'
import * as jwt from 'jsonwebtoken'

import { JwtAdapter } from 'src/infra/cryptography'
import { throwError } from 'test/domain/mocks'

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
        test('Should call jwt.sign with correct params', async () => {
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

        test('Should throws if sign method throws', async () => {
            const sut = makeSut()
            jest.spyOn(jwt, 'sign').mockImplementationOnce(throwError)

            const promise = sut.encrypt('any_id')

            expect(promise).rejects.toThrow()
        })
    })

    describe('verify()', () => {
        test('Should call jwt.verify with correct params', async () => {
            const sut = makeSut()
            const verifySpy = jest.spyOn(jwt, 'verify')

            await sut.decrypt('any_token')

            expect(verifySpy).toHaveBeenCalledWith('any_token', 'secret')
        })

        test('Should return any_value on success', async () => {
            const sut = makeSut()

            const result = await sut.decrypt('any_token')

            expect(result).toBe('any_value')
        })
        
        test('Should throws if verify method throws', async () => {
            const sut = makeSut()
            jest.spyOn(jwt, 'verify').mockImplementationOnce(throwError)

            const promise = sut.decrypt('any_token')

            expect(promise).rejects.toThrow()
        })
    })
})