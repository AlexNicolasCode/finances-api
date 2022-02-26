import { AccountBalance } from "src/domain/models";

export interface LoadAccountBalanceByEmail {
    loadByEmail: (emai: string) => Promise<LoadAccountBalanceByEmail.Result>
}

export namespace LoadAccountBalanceByEmail {
    export type Result = AccountBalance
}