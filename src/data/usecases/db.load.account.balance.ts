import { LoadAccountBalance } from "src/domain/usecases"
import { LoadAccountBalanceByEmail, LoadAccountByAccessTokenRepository } from "../protocols"

export class DbLoadAccountBalance implements LoadAccountBalance {
    constructor (
        private readonly loadAccountByAccessTokenRepository: LoadAccountByAccessTokenRepository,
        private readonly loadAccountBalanceByEmailRepositorySpy: LoadAccountBalanceByEmail
    ) {}

    async load ({ accessToken }: LoadAccountBalance.Params): Promise<LoadAccountBalance.Result> {
        const account = await this.loadAccountByAccessTokenRepository.loadByAccessToken(accessToken)
        if (!account) return
        return this.loadAccountBalanceByEmailRepositorySpy.loadByEmail(account.email)
    }
}