import { DbAddAccount } from "src/data/usecases"
import { mockUserModel, throwError } from "test/domain/mocks"
import { AddAccountRepositorySpy, CheckAccountByEmailRepositorySpy, HasherSpy } from "../mocks"

type SutTypes = {
    sut: DbAddAccount
    hasherSpy: HasherSpy
}

const makeSut = (): SutTypes => {
    const checkAccountByEmailRepositorySpy = new CheckAccountByEmailRepositorySpy()
    const addAccountRepositorySpy = new AddAccountRepositorySpy()
    const hasherSpy = new HasherSpy()
    const sut = new DbAddAccount(hasherSpy, addAccountRepositorySpy, checkAccountByEmailRepositorySpy)
    return {
        sut,
        hasherSpy,
    }
}

describe('DbAddAccount usecase', () => {
    test('Should call Hasher with correct plaintext', async () => {
        const { sut, hasherSpy } = makeSut()
        const addAccountParamsMock = mockUserModel()
        
        await sut.add(addAccountParamsMock)
        
        expect(hasherSpy.plaintext).toBe(addAccountParamsMock.password)
    })
    
    test('Should throw if Hasher throws', async () => {
        const { sut, hasherSpy } = makeSut()
        const addAccountParamsMock = mockUserModel()
        jest.spyOn(hasherSpy, 'hash').mockImplementation(throwError)
        
        const promise = sut.add(addAccountParamsMock)

        await expect(promise).rejects.toThrow()
    })
})