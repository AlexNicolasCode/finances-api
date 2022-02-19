import { prisma } from ".";

import { CheckAccountByEmailRepository, LoadAccountByEmailRepository } from "src/data/protocols";

export class AccountRepository implements LoadAccountByEmailRepository, CheckAccountByEmailRepository {
    async loadByEmail (email: string): Promise<LoadAccountByEmailRepository.Result> {
        const account = await prisma.user.findUnique({
            where: {
                email
            }
        })
        return account
    }

    async checkByEmail (email: string): Promise<CheckAccountByEmailRepository.Result> {
        const account = await prisma.user.findUnique({
            where: {
                email
            }
        })
        return account !== null
    }
}