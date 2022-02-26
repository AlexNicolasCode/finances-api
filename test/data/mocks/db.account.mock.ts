import faker from "@faker-js/faker";

import { 
    AddAccountRepository, 
    CheckAccountByEmailRepository, 
    LoadAccountBalanceById, 
    LoadAccountByAccessTokenRepository, 
    LoadAccountByEmailRepository
} from "src/data/protocols";
import { mockAccessToken, mockAccountBalance, mockUserModel } from "test/domain/mocks";

export class AddAccountRepositorySpy implements AddAccountRepository {
    params: AddAccountRepository.Params
    result = true

    async add (params: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
        this.params = params
        return this.result
    }
}

export class CheckAccountByEmailRepositorySpy implements CheckAccountByEmailRepository {
    email: string
    result = false

    async checkByEmail (email: string): Promise<CheckAccountByEmailRepository.Result> {
        this.email = email
        return this.result
    }
}

export class LoadAccountByEmailRepositorySpy implements LoadAccountByEmailRepository {
    email: string
    result = {
        id: faker.datatype.number(),
        password: faker.internet.password(),
    }
    
    async loadByEmail (email: string): Promise<LoadAccountByEmailRepository.Result> {
        this.email = email
        return {
            ...this.result,
            email
        }
    }
}

export class LoadAccountByAccessTokenRepositorySpy implements LoadAccountByAccessTokenRepository {
    token: string
    user = mockUserModel()

    async loadByAccessToken (token: string): Promise<LoadAccountByAccessTokenRepository.Result> {
        this.token = token
        return this.user
    }
}

export class LoadAccountBalanceByIdRepositorySpy implements LoadAccountBalanceById {
    id: number
    result = mockAccountBalance()

    async loadAccountBalanceById (id: number): Promise<LoadAccountBalanceById.Result> {
        this.id = id
        return this.result
    }
}