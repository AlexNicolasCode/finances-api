import { UserModel } from "src/domain/models";

export interface LoadAccountByEmailRepository {
    loadByEmail: (email: string) => Promise<LoadAccountByEmailRepository.Result>
}

export namespace LoadAccountByEmailRepository {
    export type Result = UserModel
}