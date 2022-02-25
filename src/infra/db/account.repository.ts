import { AddAccountRepository, CheckAccountByEmailRepository, LoadAccountByEmailRepository } from "src/data/protocols";
import { AddAccount } from "src/domain/usecases";

export class AccountRepository implements LoadAccountByEmailRepository, CheckAccountByEmailRepository, AddAccount { 
    constructor (
        private readonly loadccountRepository: LoadAccountByEmailRepository,
        private readonly addAccountRepository: AddAccountRepository
    ) {}

    async add ({ email, password }: AddAccount.Params): Promise<AddAccount.Result> {
        const result = await this.loadByEmail(email)
        if (result) {
            return false
        }
        const hasAdded = await this.addAccountRepository.add({ email, password });
        return hasAdded ? true : false
    }

    async loadByEmail (email: string): Promise<LoadAccountByEmailRepository.Result> {
        const account = await this.loadccountRepository.loadByEmail(email);
        return account
    }

    async checkByEmail (email: string): Promise<CheckAccountByEmailRepository.Result> {
        const account = await this.loadByEmail(email)
        return account !== null
    }
}