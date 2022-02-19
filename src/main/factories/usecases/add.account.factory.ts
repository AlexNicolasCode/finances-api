import { DbAddAccount } from "src/data/usecases";
import { AddAccount } from "src/domain/usecases";
import { BycryptApapter } from "src/infra/cryptography";
import { AccountRepository } from "src/infra/db/account.repository";

export const makeDbAddAccount = (): AddAccount => {
    const salt = 12
    const bycryptApapter = new BycryptApapter(salt)
    const accountRepository = new AccountRepository()
    return new DbAddAccount(bycryptApapter, accountRepository, accountRepository)
}