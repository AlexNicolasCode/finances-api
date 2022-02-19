export interface Validator {
    validate: (plaintext: string) => Validator.Result
}  

export namespace Validator {
    export type Result = {
        isValid: boolean,
        error?: Error
    }
}