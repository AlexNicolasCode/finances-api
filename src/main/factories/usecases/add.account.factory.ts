import { DbAddAccount } from "src/data/usecases";
import { AddAccount } from "src/domain/usecases";
import { BcryptAdapter } from "src/infra/cryptography";
import { PrismaAdapter } from "src/infra/db";
import { AccountRepository } from "src/infra/db";

export const makeDbAddAccount = (): AddAccount => {
    const salt = 12
    const bcryptAdapter = new BcryptAdapter(salt)
    const prismaAdapter = new PrismaAdapter() 
    const accountRepository = new AccountRepository(prismaAdapter, prismaAdapter)
    return new DbAddAccount(bcryptAdapter, accountRepository, accountRepository)
}