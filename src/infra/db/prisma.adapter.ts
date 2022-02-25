import { PrismaClient } from ".prisma/client";
import { AddAccountRepository, LoadAccountByEmailRepository } from "src/data/protocols";
import { AddAccount } from "src/domain/usecases";

export class PrismaAdapter implements LoadAccountByEmailRepository, AddAccountRepository {
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
}