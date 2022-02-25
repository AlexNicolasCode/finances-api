import faker from "@faker-js/faker"
import { DbAuthentication } from "src/data/usecases"
import { mockAccessToken, mockUserModel, throwError } from "test/domain/mocks"
import { EncrypterSpy, HashComparerSpy, LoadAccountByEmailRepositorySpy } from "../mocks"

type SutTypes = {
    sut: DbAuthentication
    hashComparer: HashComparerSpy
    loadAccountByEmailRepository: LoadAccountByEmailRepositorySpy
    encrypter: EncrypterSpy
}

const makeSut = (): SutTypes => {
    const loadAccountByEmailRepository = new LoadAccountByEmailRepositorySpy() 
    const hashComparer = new HashComparerSpy() 
    const encrypter = new EncrypterSpy()
    const sut = new DbAuthentication(loadAccountByEmailRepository, hashComparer, encrypter) 
    return {
        sut,
        hashComparer,
        loadAccountByEmailRepository,
        encrypter
    }
}

describe('DbAuthentication usecase', () => {
    test('Should call HashComparer with correct plaintext', async () => {
        const { sut, hashComparer } = makeSut()
        const authAccountParams = mockUserModel()
        
        await sut.auth(authAccountParams)
        
        expect(hashComparer.plaintext).toBe(authAccountParams.password)
    })

    test('Should return null if HashComparer return false and password is incorrect', async () => {
        const { sut, hashComparer } = makeSut()
        const authAccountParams = mockUserModel()
        hashComparer.isValid = false
        
        const isValid = await sut.auth(authAccountParams)
        
        expect(isValid).toBeNull()
    })
    
    test('Should throw if HashComparer throws', async () => {
        const { sut, hashComparer } = makeSut()
        const authAccountParams = mockUserModel()
        jest.spyOn(hashComparer, 'compare').mockImplementationOnce(throwError)
        
        const promise = sut.auth(authAccountParams)
        
        expect(promise).rejects.toThrow()
    })
    
    test('Should call LoadAccountByEmailRepository with correct email', async () => {
        const { sut, loadAccountByEmailRepository } = makeSut()
        const authAccountParams = mockUserModel()
        
        await sut.auth(authAccountParams)
        
        expect(loadAccountByEmailRepository.email).toEqual(authAccountParams.email)
    })
    
    test('Should return null if LoadAccountByEmailRepository not found account', async () => {
        const { sut, loadAccountByEmailRepository } = makeSut()
        const authAccountParams = mockUserModel()
        jest.spyOn(loadAccountByEmailRepository, 'loadByEmail').mockImplementationOnce(null)
        
        const isValid = await sut.auth(authAccountParams)
        
        expect(isValid).toBeFalsy()
    })
    
    
    test('Should throw if LoadAccountByEmailRepository throws', async () => {
        const { sut, loadAccountByEmailRepository } = makeSut()
        const authAccountParams = mockUserModel()
        jest.spyOn(loadAccountByEmailRepository, 'loadByEmail').mockImplementationOnce(throwError)
        
        const promise = sut.auth(authAccountParams)
        
        await expect(promise).rejects.toThrow()
    })
    
    test('Should return access token on success', async () => {
        const { sut, encrypter } = makeSut()
        const authAccountParams = mockUserModel()
        const { accessToken } = mockAccessToken()
        encrypter.ciphertext = accessToken
        
        const result = await sut.auth(authAccountParams)
        
        expect(result).toStrictEqual({ accessToken })
    })

    test('Should throw if Encrypter throws', async () => {
        const { sut, encrypter } = makeSut()
        const authAccountParams = mockUserModel()
        jest.spyOn(encrypter, 'encrypt').mockImplementationOnce(throwError)

        const promise = sut.auth(authAccountParams)

        await expect(promise).rejects.toThrow()
    })
})