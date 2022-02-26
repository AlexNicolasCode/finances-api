import { AccountBalance } from "../models"

export interface LoadAccountBalance {
    load: (data: LoadAccountBalance.Params) => Promise<LoadAccountBalance.Result>
}

export namespace LoadAccountBalance {
    export type Params = {
        accessToken: string
    }
    export type Result = AccountBalance
}