import { LoadAccountBalance } from "src/domain/usecases"
import { LoadAccountBalanceByEmail, LoadAccountByAccessTokenRepository } from "src/data/protocols"
import { LoadAccountBalanceByEmailRepositorySpy, LoadAccountByAccessTokenRepositorySpy } from "../mocks"
import { throwError } from "test/domain/mocks"

class DbLoadAccountBalance implements LoadAccountBalance {
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


describe('DbLoadAccountBalance', () => {
    test('Should return undefined if loadAccountByAccessTokenRepository not found an account', async () => {
        const loadAccountByAccessTokenRepositorySpy = new LoadAccountByAccessTokenRepositorySpy()
        jest.spyOn(loadAccountByAccessTokenRepositorySpy, 'loadByAccessToken').mockImplementationOnce(() => undefined)
        const loadAccountBalanceByEmailRepositorySpy = new LoadAccountBalanceByEmailRepositorySpy()
        const sut = new DbLoadAccountBalance(loadAccountByAccessTokenRepositorySpy, loadAccountBalanceByEmailRepositorySpy)

        const result = await sut.load({ accessToken: 'any_token' })

        expect(result).toBeUndefined()
    })
    test('Should throw if loadAccountByAccessTokenRepository throws', async () => {
        const loadAccountByAccessTokenRepositorySpy = new LoadAccountByAccessTokenRepositorySpy()
        jest.spyOn(loadAccountByAccessTokenRepositorySpy, 'loadByAccessToken').mockImplementationOnce(throwError)
        const loadAccountBalanceByEmailRepositorySpy = new LoadAccountBalanceByEmailRepositorySpy()
        const sut = new DbLoadAccountBalance(loadAccountByAccessTokenRepositorySpy, loadAccountBalanceByEmailRepositorySpy)

        const promise = sut.load({ accessToken: 'any_token' })

        expect(promise).rejects.toThrow()
    })
})