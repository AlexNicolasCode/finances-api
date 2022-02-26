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

type SutType = {
    sut: LoadAccountBalance 
    loadAccountByAccessTokenRepositorySpy: LoadAccountByAccessTokenRepositorySpy
    loadAccountBalanceByEmailRepositorySpy: LoadAccountBalanceByEmailRepositorySpy
}

const makeSut = (): SutType => {
    const loadAccountByAccessTokenRepositorySpy = new LoadAccountByAccessTokenRepositorySpy()
    const loadAccountBalanceByEmailRepositorySpy = new LoadAccountBalanceByEmailRepositorySpy()
    const sut = new DbLoadAccountBalance(loadAccountByAccessTokenRepositorySpy, loadAccountBalanceByEmailRepositorySpy)
    return {
        sut,
        loadAccountByAccessTokenRepositorySpy,
        loadAccountBalanceByEmailRepositorySpy,
    }
}


describe('DbLoadAccountBalance', () => {
    test('Should return undefined if loadAccountByAccessTokenRepository not found an account', async () => {
        const { sut, loadAccountByAccessTokenRepositorySpy } = makeSut()
        jest.spyOn(loadAccountByAccessTokenRepositorySpy, 'loadByAccessToken').mockImplementationOnce(() => undefined)

        const result = await sut.load({ accessToken: 'any_token' })

        expect(result).toBeUndefined()
    })

    test('Should throw if loadAccountByAccessTokenRepository throws', async () => {
        const { sut, loadAccountByAccessTokenRepositorySpy } = makeSut()
        jest.spyOn(loadAccountByAccessTokenRepositorySpy, 'loadByAccessToken').mockImplementationOnce(throwError)
        
        const promise = sut.load({ accessToken: 'any_token' })

        expect(promise).rejects.toThrow()
    })

    test('Should call LoadAccountByAccessTokenRepositorySpy with correct params', async () => {
        const { sut, loadAccountByAccessTokenRepositorySpy } = makeSut()
        const spy = jest.spyOn(loadAccountByAccessTokenRepositorySpy, 'loadByAccessToken')

        await sut.load({ accessToken: 'any_token' })

        expect(spy).toBeCalledWith('any_token')
    })

    test('Should call loadByEmail on loadAccountBalanceByEmailRepositorySpy with correct email', async () => {
        const { 
            sut, 
            loadAccountByAccessTokenRepositorySpy, 
            loadAccountBalanceByEmailRepositorySpy
        } = makeSut()
        const spy = jest.spyOn(loadAccountBalanceByEmailRepositorySpy, 'loadByEmail')

        await sut.load({ accessToken: 'any_token' })

        expect(spy).toBeCalledWith(loadAccountByAccessTokenRepositorySpy.user.email)
    })

    test('Should throw if loadAccountBalanceByEmailRepositorySpy throws', async () => {
        const { sut, loadAccountBalanceByEmailRepositorySpy } = makeSut()
        jest.spyOn(loadAccountBalanceByEmailRepositorySpy, 'loadByEmail').mockImplementationOnce(throwError)
        
        const promise = sut.load({ accessToken: 'any_token' })

        expect(promise).rejects.toThrow()
    })

    test('Should return undefined if loadAccountBalanceByEmailRepositorySpy not found an account', async () => {
        const { sut, loadAccountBalanceByEmailRepositorySpy } = makeSut()
        jest.spyOn(loadAccountBalanceByEmailRepositorySpy, 'loadByEmail').mockImplementationOnce(() => undefined)

        const result = await sut.load({ accessToken: 'any_token' })

        expect(result).toBeUndefined()
    })

    test('Should return AccountBalance on success', async () => {
        const { sut, loadAccountBalanceByEmailRepositorySpy } = makeSut()

        const result = await sut.load({ accessToken: 'any_token' })

        expect(result).toBe(loadAccountBalanceByEmailRepositorySpy.result)
    })
})