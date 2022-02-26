import * as validator from 'validator'

import { EmailValidatorAdapter } from "src/infra/validators"

describe('EmailValidatorAdapter', () => {
    test('Should return false if validator returns false', () => {
        const sut = new EmailValidatorAdapter()
        jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)

        const isValid = sut.isValid('email@mail.com')

        expect(isValid).toBe(false)
    })
})