import * as bcrypt from 'bcrypt'

import { BcryptAdapter } from 'src/infra/cryptography'
import { throwError } from 'test/domain/mocks'

jest.mock('bcrypt', () => ({
    async hash (): Promise<string> {
        return 'hash'
    },
}))

type SutType = {
    sut: BcryptAdapter
    salt: number
}

const makeSut = (): SutType => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    return {
        sut,
        salt,
    }
}

describe('BcryptAdapter', () => {
    describe('hash', () => {
        test('Should call hash method with correct params', async () => {
            const { sut, salt } = makeSut()
            const hashSpy = jest.spyOn(bcrypt, 'hash')

            await sut.hash('any_value')

            expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
        })

        test('Should return hash on success', async () => {
            const { sut } = makeSut()
            
            const hash = await sut.hash('any_value')

            expect(hash).toBe('hash')
        })

        test('Should throw if hash throws', async () => {
            const { sut } = makeSut()
            jest.spyOn(bcrypt, 'hash').mockImplementationOnce(throwError)
            
            const promise = sut.hash('any_value')

            expect(promise).rejects.toThrow()
        })
    })
})