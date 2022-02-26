import { DbLoadAccountBalance } from "src/data/usecases";
import { JwtAdapter } from "src/infra/cryptography";
import { AccountBalanceRepository, AccountRepository, PrismaAdapter } from "src/infra/db";

export const makeDbLoadAccountBalance = (): DbLoadAccountBalance => {
    const jwtAdapter = new JwtAdapter('secret')
    const prismaAdapter = new PrismaAdapter()
    const accountRepository = new AccountRepository(prismaAdapter, prismaAdapter)
    const accountBalanceRepository = new AccountBalanceRepository(prismaAdapter)
    return new DbLoadAccountBalance(jwtAdapter, accountRepository, accountBalanceRepository)
}