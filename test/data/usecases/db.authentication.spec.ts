import { DbAuthentication } from "src/data/usecases"
import { mockUserModel } from "test/domain/mocks"
import { EncrypterSpy, HashComparerSpy, LoadAccountByEmailRepositorySpy } from "../mocks"


describe('DbAuthentication usecase', () => {
    test('Should call HashComparer with correct plaintext', async () => {
        const loadAccountByEmailRepository = new LoadAccountByEmailRepositorySpy() 
        const hashComparer = new HashComparerSpy() 
        const encrypter = new EncrypterSpy()
        const sut = new DbAuthentication(loadAccountByEmailRepository, hashComparer, encrypter) 
        const authAccountParams = mockUserModel()
        
        await sut.auth(authAccountParams)
        
        expect(hashComparer.plaintext).toBe(authAccountParams.password)
    })
})