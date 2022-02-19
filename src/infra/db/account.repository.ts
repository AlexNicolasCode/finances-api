import { prisma } from ".";

import { CheckAccountByEmailRepository, LoadAccountByEmailRepository } from "src/data/protocols";
import { AddAccount } from "src/domain/usecases";

export class AccountRepository implements LoadAccountByEmailRepository, CheckAccountByEmailRepository, AddAccount { 
    async add ({ email, password }: AddAccount.Params): Promise<AddAccount.Result> {
        const result = await prisma.user.create({
            data: {
                email,
                password
            }
        }) 
        return result ? true : false
    }

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