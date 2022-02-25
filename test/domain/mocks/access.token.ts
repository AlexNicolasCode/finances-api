import { faker } from '@faker-js/faker'

import { Authentication } from 'src/domain/usecases'

export const mockAccessToken = (): Authentication.Result => ({
    accessToken: faker.datatype.string(5)
})