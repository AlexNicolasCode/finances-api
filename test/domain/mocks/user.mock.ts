import { UserModel } from "src/domain/models";

import { faker } from '@faker-js/faker'

export const mockUserModel = (): UserModel => ({
    id: faker.datatype.uuid(),
    email: faker.internet.email(),
    password: faker.internet.password()
})