import env from "src/main/config/env";
import { Authentication } from "src/domain/usecases";
import { BcryptAdapter, JwtAdapter } from "src/infra/cryptography";
import { AccountRepository } from "src/infra/db";
import { DbAuthentication } from "src/data/usecases";
import { PrismaAdapter } from "src/infra/db";

export const makeDbAuthentication = (): Authentication => {
    const salt = 12
    const bcryptAdapter = new BcryptAdapter(salt)
    const jwtAdapter = new JwtAdapter(env.jwtSecret)
    const prismaAdapter = new PrismaAdapter()
    const accountRepository = new AccountRepository(prismaAdapter, prismaAdapter)
    return new DbAuthentication(accountRepository, bcryptAdapter, jwtAdapter)
} 