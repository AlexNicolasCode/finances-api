import { AccountBalanceRepository } from "src/infra/db"
import { LoadAccountBalanceByIdRepositorySpy } from "test/data/mocks"
import { mockUserModel, throwError } from "test/domain/mocks"

type SutType = {
    loadAccountBalanceById: LoadAccountBalanceByIdRepositorySpy
    userIdMock: number
    sut: AccountBalanceRepository
}

const makeSut = (): SutType => {
    const loadAccountBalanceById = new LoadAccountBalanceByIdRepositorySpy()
    const userIdMock = mockUserModel().id
    const sut = new AccountBalanceRepository(loadAccountBalanceById)
    return {
        sut,
        loadAccountBalanceById,
        userIdMock
    }
}

describe('AccountBalanceRepository', () => {
    test('Should return AccountBalance on success', async () => {
        const {
            sut,
            loadAccountBalanceById,
            userIdMock
        } = makeSut()

        const result = await sut.loadAccountBalanceById(userIdMock)

        expect(result).toBe(loadAccountBalanceById.result)
    })

    test('Should throw if loadAccountBalanceById throws', async () => {
        const {
            sut,
            loadAccountBalanceById,
            userIdMock
        } = makeSut()
        jest.spyOn(loadAccountBalanceById, 'loadAccountBalanceById').mockImplementationOnce(throwError)

        const promise = sut.loadAccountBalanceById(userIdMock)

        expect(promise).rejects.toThrow()
    })
})