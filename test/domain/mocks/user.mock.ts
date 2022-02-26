import { faker } from '@faker-js/faker'

import { UserModel } from "src/domain/models"
import { mockAccessToken } from "."

export const mockUserModel = (): UserModel => ({
    id: faker.datatype.number(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    accessToken: mockAccessToken().accessToken
})