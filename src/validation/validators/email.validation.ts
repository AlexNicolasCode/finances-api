import { InvalidParamError } from "src/presentation/errors";
import { Validator } from "src/presentation/protocols";
import { EmailValidator } from "../protocols";

export class EmailValidation implements Validator {
    constructor (
        private readonly fieldName: string,
        private readonly emailValidator: EmailValidator
    ) {}

    validate(input: string): Error {
        const isValid = this.emailValidator.isValid(input[this.fieldName])
        if (!isValid) {
            return new InvalidParamError(this.fieldName)
        }
    };
}