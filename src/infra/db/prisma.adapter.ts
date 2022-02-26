import { PrismaClient } from ".prisma/client";
import { 
    AddAccountRepository, 
    LoadAccountBalanceById, 
    LoadAccountByEmailRepository
} from "src/data/protocols";
import { AccountBalance } from "src/domain/models";
import { AddAccount } from "src/domain/usecases";

export class PrismaAdapter implements LoadAccountByEmailRepository, AddAccountRepository, LoadAccountBalanceById {
    constructor (
        private readonly prisma = new PrismaClient()
    ) {}

    async loadByEmail (email: string): Promise<LoadAccountByEmailRepository.Result> {
        const result = await this.prisma.user.findUnique({
            where: { email }
        })
        return result
    }

    async add ({ email, password }: AddAccount.Params): Promise<AddAccount.Result> {
        const accountResult = this.prisma.user.create({
            data: {
                email,
                password
            }
        })
        return accountResult ? true : false
    }

    async loadAccountBalanceById (id: number): Promise<AccountBalance> {
        const accountBalance = await this.prisma.accountBalance.findUnique({
            where: {
                userId: id
            }
        })
        return {
            balance: accountBalance.balance,
            income: accountBalance.income,
            outgoing: accountBalance.outgoing,
        }
    }
}