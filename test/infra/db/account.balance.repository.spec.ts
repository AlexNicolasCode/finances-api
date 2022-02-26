import { AccountBalanceRepository } from "src/infra/db"
import { LoadAccountBalanceByIdRepositorySpy } from "test/data/mocks"
import { mockUserModel } from "test/domain/mocks"


describe('AccountBalanceRepository', () => {
    test('Should return AccountBalance on success', async () => {
        const loadAccountBalanceById = new LoadAccountBalanceByIdRepositorySpy()
        const userIdMock = mockUserModel().id
        const sut = new AccountBalanceRepository(loadAccountBalanceById)

        const result = await sut.loadAccountBalanceById(userIdMock)

        expect(result).toBe(loadAccountBalanceById.result)
    })
})