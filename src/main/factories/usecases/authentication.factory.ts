import env from "src/main/config/env";
import { Authentication } from "src/domain/usecases";
import { BycryptApapter, JwtAdapter } from "src/infra/cryptography";
import { AccountRepository } from "src/infra/db/account.repository";
import { DbAuthentication } from "src/data/usecases/db.authentication";

export const makeDbAuthentication = (): Authentication => {
    const salt = 12
    const bcryptAdapter = new BycryptApapter(salt)
    const jwtAdapter = new JwtAdapter(env.jwtSecret)
    const accountRepository = new AccountRepository()
    return new DbAuthentication(accountRepository, bcryptAdapter, jwtAdapter)
} 