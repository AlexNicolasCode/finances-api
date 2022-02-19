import { EmailValidatorAdapter } from "src/infra/validators";
import { EmailValidation } from "src/validation/validators";

export const makeLoginValidation = (email): EmailValidation => {
    return new EmailValidation(email, new EmailValidatorAdapter)
}