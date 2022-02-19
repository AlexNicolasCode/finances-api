import { EmailValidatorAdapter } from "src/infra/validators";
import { EmailValidation } from "src/validation/validators";

export const makeSignUpValidation = (email): EmailValidation => {
    return new EmailValidation(email, new EmailValidatorAdapter)
}