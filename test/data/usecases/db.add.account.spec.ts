import { DbAddAccount } from "src/data/usecases"
import { mockUserModel, throwError } from "test/domain/mocks"
import { AddAccountRepositorySpy, CheckAccountByEmailRepositorySpy, HasherSpy } from "../mocks"

type SutTypes = {
    sut: DbAddAccount
    hasherSpy: HasherSpy
    addAccountRepositorySpy: AddAccountRepositorySpy
    checkAccountByEmailRepositorySpy: CheckAccountByEmailRepositorySpy
}

const makeSut = (): SutTypes => {
    const checkAccountByEmailRepositorySpy = new CheckAccountByEmailRepositorySpy()
    const addAccountRepositorySpy = new AddAccountRepositorySpy()
    const hasherSpy = new HasherSpy()
    const sut = new DbAddAccount(hasherSpy, addAccountRepositorySpy, checkAccountByEmailRepositorySpy)
    return {
        sut,
        hasherSpy,
        addAccountRepositorySpy,
        checkAccountByEmailRepositorySpy
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
            id: addAccountParamsMock.id,
            email: addAccountParamsMock.email,
            password: hasherSpy.digest,
            accessToken: addAccountParamsMock.accessToken,
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
    
    test('Should return false if AddAccountRepository returns false', async () => {
        const { sut, addAccountRepositorySpy } = makeSut()
        const addAccountParamsMock = mockUserModel()
        addAccountRepositorySpy.result = false

        const isValid = await sut.add(addAccountParamsMock)

        expect(isValid).toBe(false)
    })
    
    test('Should return false if CheckAccountByemailRepository returns true', async () => {
        const { sut, checkAccountByEmailRepositorySpy } = makeSut()
        const addAccountParamsMock = mockUserModel()
        checkAccountByEmailRepositorySpy.result = true

        const isValid = await sut.add(addAccountParamsMock)

        expect(isValid).toBe(false)
    })
    
    test('Should call CheckAccountByEmailRepository with correct email', async () => {
        const { sut, checkAccountByEmailRepositorySpy } = makeSut()
        const addAccountParamsMock = mockUserModel()

        await sut.add(addAccountParamsMock)

        expect(checkAccountByEmailRepositorySpy.email).toBe(addAccountParamsMock.email)
    })
})