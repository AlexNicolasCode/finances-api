import { PrismaClient } from ".prisma/client";
import { LoadAccountByEmailRepository } from "src/data/protocols";

export class PrismaAdapter implements LoadAccountByEmailRepository {
    constructor (
        private readonly prisma = new PrismaClient()
    ) {}

    async loadByEmail (email: string): Promise<LoadAccountByEmailRepository.Result> {
        const result = await this.prisma.user.findUnique({
            where: { email }
        })
        return result
    }
}