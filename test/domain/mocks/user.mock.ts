import { UserModel } from "src/domain/models";

import { faker } from '@faker-js/faker'

export const mockUserModel = (): UserModel => ({
    email: faker.internet.email(),
    password: faker.internet.password()
})