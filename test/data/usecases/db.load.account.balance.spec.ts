import { LoadAccountBalance } from "src/domain/usecases"
import { DecrypterSpy, LoadAccountBalanceByEmailRepositorySpy } from "../mocks"
import { throwError } from "test/domain/mocks"
import { DbLoadAccountBalance } from "src/data/usecases"

type SutType = {
    sut: LoadAccountBalance 
    decrypter: DecrypterSpy
    loadAccountBalanceByEmailRepositorySpy: LoadAccountBalanceByEmailRepositorySpy
}

const makeSut = (): SutType => {
    const decrypter = new DecrypterSpy()
    const loadAccountBalanceByEmailRepositorySpy = new LoadAccountBalanceByEmailRepositorySpy()
    const sut = new DbLoadAccountBalance(decrypter, loadAccountBalanceByEmailRepositorySpy)
    return {
        sut,
        decrypter,
        loadAccountBalanceByEmailRepositorySpy,
    }
}


describe('DbLoadAccountBalance', () => {
    test('Should return undefined if decrypter not found email', async () => {
        const { sut, decrypter } = makeSut()
        jest.spyOn(decrypter, 'decrypt').mockImplementationOnce(() => undefined)

        const result = await sut.load({ accessToken: 'any_token' })

        expect(result).toBeUndefined()
    })

    test('Should throw if decrypter throws', async () => {
        const { sut, decrypter } = makeSut()
        jest.spyOn(decrypter, 'decrypt').mockImplementationOnce(throwError)
        
        const promise = sut.load({ accessToken: 'any_token' })

        expect(promise).rejects.toThrow()
    })

    test('Should call LoadAccountByEmailRepositorySpy with correct params', async () => {
        const { sut, decrypter } = makeSut()
        const spy = jest.spyOn(decrypter, 'decrypt')

        await sut.load({ accessToken: 'any_token' })

        expect(spy).toBeCalledWith('any_token')
    })

    test('Should call decrypt on loadAccountBalanceByEmailRepositorySpy with correct email', async () => {
        const { 
            sut, 
            decrypter, 
            loadAccountBalanceByEmailRepositorySpy
        } = makeSut()
        const spy = jest.spyOn(loadAccountBalanceByEmailRepositorySpy, 'loadByEmail')

        await sut.load({ accessToken: 'any_token' })

        expect(spy).toBeCalledWith(decrypter.result.email)
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