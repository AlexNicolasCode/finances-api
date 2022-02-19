export interface Validator {
    validate: (plaintext: string) => Error
}  