import { DbAddAccount } from "src/data/usecases"
import { mockUserModel, throwError } from "test/domain/mocks"
import { AddAccountRepositorySpy, CheckAccountByEmailRepositorySpy, HasherSpy } from "../mocks"

type SutTypes = {
    sut: DbAddAccount
    hasherSpy: HasherSpy
    addAccountRepositorySpy: AddAccountRepositorySpy
}

const makeSut = (): SutTypes => {
    const checkAccountByEmailRepositorySpy = new CheckAccountByEmailRepositorySpy()
    const addAccountRepositorySpy = new AddAccountRepositorySpy()
    const hasherSpy = new HasherSpy()
    const sut = new DbAddAccount(hasherSpy, addAccountRepositorySpy, checkAccountByEmailRepositorySpy)
    return {
        sut,
        hasherSpy,
        addAccountRepositorySpy
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
    
    test('Should call AddAccountRepository with correct values', async () => {
        const { sut, addAccountRepositorySpy, hasherSpy } = makeSut()
        const addAccountParamsMock = mockUserModel() 

        await sut.add(addAccountParamsMock)

        expect(addAccountRepositorySpy.params).toEqual({
            email: addAccountParamsMock.email,
            password: hasherSpy.digest
        })
    })
    
    test('Should throw if AddAccountRepository throws', async () => {
        const { sut, addAccountRepositorySpy } = makeSut()
        const addAccountParamsMock = mockUserModel()
        jest.spyOn(addAccountRepositorySpy, 'add').mockImplementation(throwError)

        const promise = sut.add(addAccountParamsMock)

        await expect(promise).rejects.toThrow()
    })
    
    test('Should return true on success', async () => {
        const { sut } = makeSut()
        const addAccountParamsMock = mockUserModel()

        const isValid = await sut.add(addAccountParamsMock)

        expect(isValid).toBe(true)
    })
})