import { UserModel } from "../models"

export interface Authentication {
    auth: (authenticationParams: Authentication.Params) => Promise<Authentication.Result>
}

export namespace Authentication {
    export type Params = UserModel
    export type Result = {
        accessToken: string
    }
} 