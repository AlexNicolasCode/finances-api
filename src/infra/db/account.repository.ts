import { PrismaAdapter } from ".";
import { CheckAccountByEmailRepository, LoadAccountByEmailRepository } from "src/data/protocols";
import { AddAccount } from "src/domain/usecases";

export class AccountRepository implements LoadAccountByEmailRepository, CheckAccountByEmailRepository, AddAccount { 
    constructor (
        private readonly accountRepositoryManager: PrismaAdapter
    ) {}

    async add ({ email, password }: AddAccount.Params): Promise<AddAccount.Result> {
        const result = await this.accountRepositoryManager.loadByEmail(email);
        return result ? true : false
    }

    async loadByEmail (email: string): Promise<LoadAccountByEmailRepository.Result> {
        const account = await this.accountRepositoryManager.loadByEmail(email);
        return account
    }

    async checkByEmail (email: string): Promise<CheckAccountByEmailRepository.Result> {
        const account = await this.accountRepositoryManager.loadByEmail(email);
        return account !== null
    }
}