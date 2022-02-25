import { DbAddAccount } from "src/data/usecases";
import { AddAccount } from "src/domain/usecases";
import { BycryptApapter } from "src/infra/cryptography";
import { PrismaAdapter } from "src/infra/db";
import { AccountRepository } from "src/infra/db/account.repository";

export const makeDbAddAccount = (): AddAccount => {
    const salt = 12
    const bycryptApapter = new BycryptApapter(salt)
    const prismaAdapter = new PrismaAdapter() 
    const accountRepository = new AccountRepository(prismaAdapter, prismaAdapter)
    return new DbAddAccount(bycryptApapter, accountRepository, accountRepository)
}