import { LoadAccountBalance } from "src/domain/usecases"
import { Decrypter, LoadAccountBalanceByEmail } from "../protocols"

export class DbLoadAccountBalance implements LoadAccountBalance {
    constructor (
        private readonly decrypter: Decrypter,
        private readonly loadAccountBalanceByEmailRepository: LoadAccountBalanceByEmail
    ) {}

    async load ({ accessToken }: LoadAccountBalance.Params): Promise<LoadAccountBalance.Result> {
        const decryptedToken = await this.decrypter.decrypt(accessToken)
        if (!decryptedToken) return
        return this.loadAccountBalanceByEmailRepository.loadByEmail(decryptedToken.email)
    }
}