import { LoadAccountBalance } from "src/domain/usecases"
import { Decrypter, LoadAccountBalanceById, LoadAccountByEmailRepository } from "../protocols"

export class DbLoadAccountBalance implements LoadAccountBalance {
    constructor (
        private readonly decrypter: Decrypter,
        private readonly loadAccountByEmail: LoadAccountByEmailRepository,
        private readonly loadAccountBalanceByIdRepository: LoadAccountBalanceById,
    ) {}

    async load ({ accessToken }: LoadAccountBalance.Params): Promise<LoadAccountBalance.Result> {
        const decryptedToken = await this.decrypter.decrypt(accessToken)
        if (!decryptedToken) return
        const account = await this.loadAccountByEmail.loadByEmail(decryptedToken.email)
        if (!account) return
        return await this.loadAccountBalanceByIdRepository.loadAccountBalanceById(account.id)
    }
}