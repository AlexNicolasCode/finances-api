import { DbAddAccount } from "src/data/usecases"
import { mockUserModel } from "test/domain/models"
import { AddAccountRepositorySpy, CheckAccountByEmailRepositorySpy, HasherSpy } from "../mocks"

describe('DbAddAccount usecase', () => {
    test('Should call Hasher with correct plaintext', async () => {
        const checkAccountByEmailRepositorySpy = new CheckAccountByEmailRepositorySpy()
        const addAccountRepositorySpy = new AddAccountRepositorySpy()
        const hasherSpy = new HasherSpy()
        const addAccountParamsMock = mockUserModel()
        const sut = new DbAddAccount(hasherSpy, addAccountRepositorySpy, checkAccountByEmailRepositorySpy)
        
        await sut.add(addAccountParamsMock)

        expect(hasherSpy.plaintext).toBe(addAccountParamsMock.password)
    })
})