import { UserModel } from "src/domain/models";

export interface LoadAccountByAccessTokenRepository {
    loadByAccessToken: (token: string) => Promise<LoadAccountByAccessTokenRepository.Result>
}

export namespace LoadAccountByAccessTokenRepository {
    export type Result = UserModel
}