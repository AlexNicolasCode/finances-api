import { LoadAccountBalance } from "src/domain/usecases"
import { DecrypterSpy, LoadAccountBalanceByIdRepositorySpy, LoadAccountByEmailRepositorySpy } from "../mocks"
import { throwError } from "test/domain/mocks"
import { DbLoadAccountBalance } from "src/data/usecases"

type SutType = {
    sut: LoadAccountBalance 
    decrypter: DecrypterSpy
    loadAccountBalanceByIdRepositorySpy: LoadAccountBalanceByIdRepositorySpy
    loadAccountByEmailSpy: LoadAccountByEmailRepositorySpy
}

const makeSut = (): SutType => {
    const decrypter = new DecrypterSpy()
    const loadAccountByEmailSpy = new LoadAccountByEmailRepositorySpy()
    const loadAccountBalanceByIdRepositorySpy = new LoadAccountBalanceByIdRepositorySpy()
    const sut = new DbLoadAccountBalance(decrypter, loadAccountByEmailSpy, loadAccountBalanceByIdRepositorySpy)
    return {
        sut,
        decrypter,
        loadAccountByEmailSpy,
        loadAccountBalanceByIdRepositorySpy,
    }
}


describe('DbLoadAccountBalance', () => {
    describe('decrypter', () => {
        test('Should return undefined if not found email', async () => {
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

        test('Should call decrypter with correct params', async () => {
            const { sut, decrypter } = makeSut()
            const spy = jest.spyOn(decrypter, 'decrypt')
    
            await sut.load({ accessToken: 'any_token' })
    
            expect(spy).toBeCalledWith('any_token')
        })
    })

    describe('LoadAccountByEmailSpy', () => {
        test('Should be called with correct id', async () => {
            const {
                sut,
                decrypter,
                loadAccountByEmailSpy
            } = makeSut()
            const spy = jest.spyOn(loadAccountByEmailSpy, 'loadByEmail')

            await sut.load({ accessToken: 'any_token' })

            expect(spy).toBeCalledWith(decrypter.result.email)
            expect(spy).toBeCalledWith(decrypter.result.email)
        })
    })

    describe('loadAccountBalanceByIdRepositorySpy', () => {
        test('Should call loadAccountBalanceByIdRepositorySpy with correct id', async () => {
            const { 
                sut,  
                loadAccountByEmailSpy,
                loadAccountBalanceByIdRepositorySpy,
            } = makeSut()
            const spy = jest.spyOn(loadAccountBalanceByIdRepositorySpy, 'loadAccountBalanceById')
    
            await sut.load({ accessToken: 'any_token' })
    
            expect(spy).toBeCalledWith(loadAccountByEmailSpy.result.id)
        })
    
        test('Should throw if loadAccountBalanceByIdRepositorySpy throws', async () => {
            const { sut, loadAccountBalanceByIdRepositorySpy } = makeSut()
            jest.spyOn(loadAccountBalanceByIdRepositorySpy, 'loadAccountBalanceById').mockImplementationOnce(throwError)
            
            const promise = sut.load({ accessToken: 'any_token' })
    
            expect(promise).rejects.toThrow()
        })
    
        test('Should return undefined if loadAccountBalanceByIdRepositorySpy not found an account', async () => {
            const { sut, loadAccountBalanceByIdRepositorySpy } = makeSut()
            jest.spyOn(loadAccountBalanceByIdRepositorySpy, 'loadAccountBalanceById').mockImplementationOnce(() => undefined)
    
            const result = await sut.load({ accessToken: 'any_token' })
    
            expect(result).toBeUndefined()
        })
    })

    test('Should return AccountBalance on success', async () => {
        const { sut, loadAccountBalanceByIdRepositorySpy } = makeSut()

        const result = await sut.load({ accessToken: 'any_token' })

        expect(result).toBe(loadAccountBalanceByIdRepositorySpy.result)
    })
})