import faker from "@faker-js/faker";

import { LoadAccountBalance } from "src/domain/usecases";

export const mockAccountBalance = (): LoadAccountBalance.Result => ({
    balance: faker.datatype.number(2),
    income: faker.datatype.number(2),
    outgoing: faker.datatype.number(2),
})