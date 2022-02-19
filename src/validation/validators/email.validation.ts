import { InvalidParamError } from "src/presentation/errors";
import { Validator } from "src/presentation/protocols";
import { EmailValidator } from "../protocols";

export class EmailValidation implements Validator {
    constructor (
        private readonly fieldName: string,
        private readonly emailValidator: EmailValidator
    ) {}

    validate(input: string): Validator.Result {
        const isValid = this.emailValidator.isValid(input[this.fieldName])
        if (!isValid) {
            return { 
                isValid: false,
                error: new InvalidParamError(this.fieldName) 
            }
        }
        return {
            isValid: true
        }
    };
}