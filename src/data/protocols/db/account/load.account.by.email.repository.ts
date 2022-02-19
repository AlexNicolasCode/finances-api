export interface LoadAccountByEmailRepository {
    loadByEmail: (email: string) => Promise<LoadAccountByEmailRepository.Result>
}

export namespace LoadAccountByEmailRepository {
    export type Result = {
        id: number
        email: string
        password: string
    }
}