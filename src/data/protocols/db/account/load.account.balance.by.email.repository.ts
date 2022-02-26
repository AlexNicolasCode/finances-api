import { AccountBalance } from "src/domain/models";

export interface LoadAccountBalanceById {
    loadAccountBalanceById: (id: number) => Promise<LoadAccountBalanceById.Result>
}

export namespace LoadAccountBalanceById {
    export type Result = AccountBalance
}