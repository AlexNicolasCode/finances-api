import { DbAuthentication } from "src/data/usecases"
import { mockUserModel, throwError } from "test/domain/mocks"
import { EncrypterSpy, HashComparerSpy, LoadAccountByEmailRepositorySpy } from "../mocks"

type SutTypes = {
    sut: DbAuthentication
    hashComparer: HashComparerSpy
    loadAccountByEmailRepository: LoadAccountByEmailRepositorySpy
}

const makeSut = (): SutTypes => {
    const loadAccountByEmailRepository = new LoadAccountByEmailRepositorySpy() 
    const hashComparer = new HashComparerSpy() 
    const encrypter = new EncrypterSpy()
    const sut = new DbAuthentication(loadAccountByEmailRepository, hashComparer, encrypter) 
    return {
        sut,
        hashComparer,
        loadAccountByEmailRepository
    }
}

describe('DbAuthentication usecase', () => {
    test('Should call HashComparer with correct plaintext', async () => {
        const { sut, hashComparer } = makeSut()
        const authAccountParams = mockUserModel()
        
        await sut.auth(authAccountParams)
        
        expect(hashComparer.plaintext).toBe(authAccountParams.password)
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
})