import { Controller, Inject, Post } from '@nestjs/common';

import { Authentication } from 'src/domain/usecases';
import { HttpResponse } from 'src/presentation/protocols';
import { EmailValidation } from 'src/validation/validators';
import { badRequest, ok } from 'src/presentation/helpers';

@Controller('login')
export class LoginController {
  constructor(
    @Inject('AUTHENTICATION') private readonly authentication: Authentication,
    @Inject('EMAIL_VALIDATION') private readonly emailValidation: EmailValidation
  ) {}

  @Post()
  async handle({ email, password }: Authentication.Params): Promise<HttpResponse> {
    const { isValid, error } = this.emailValidation.validate(email)
    if (!isValid) {
      return badRequest(error)
    }
    const auth = await this.authentication.auth({ email, password })
    return ok({ accessToken: auth.accessToken })
  }
}
