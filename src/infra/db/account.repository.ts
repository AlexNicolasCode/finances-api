import { LoadAccountByEmailRepository } from "src/data/protocols";
import { prisma } from ".";

export class AccountRepository implements LoadAccountByEmailRepository {
    async loadByEmail (email: string): Promise<LoadAccountByEmailRepository.Result> {
        const account = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        return account
    }
}