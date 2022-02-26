import { LoadAccountBalanceById } from "src/data/protocols";

export class AccountBalanceRepository implements LoadAccountBalanceById { 
    constructor (
        private readonly loadccountBalanceRepository: LoadAccountBalanceById
    ) {}

    async loadAccountBalanceById (id: number): Promise<LoadAccountBalanceById.Result> {
        return await this.loadccountBalanceRepository.loadAccountBalanceById(id)
    }
}