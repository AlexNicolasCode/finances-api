import * as validator from 'validator'

import { EmailValidatorAdapter } from "src/infra/validators"

jest.mock('validator', () => ({
    isEmail (): boolean {
        return true
    }
}))

const makeSut = (): EmailValidatorAdapter => {
    return new EmailValidatorAdapter()
}

describe('EmailValidatorAdapter', () => {
    test('Should return false if validator returns false', () => {
        const sut = makeSut()
        jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)

        const isValid = sut.isValid('email@mail.com')

        expect(isValid).toBe(false)
    })

    test('Should return true if email is valid', () => {
        const sut = makeSut()

        const isValid = sut.isValid('email@mail.com')

        expect(isValid).toBe(true)
    })
})