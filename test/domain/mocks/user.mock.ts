import { UserModel } from "src/domain/models";

import { faker } from '@faker-js/faker'

export const mockUserModel = (): UserModel => ({
    email: faker.lorem.words(),
    password: faker.lorem.words()
})