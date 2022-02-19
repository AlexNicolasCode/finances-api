import { Controller, Inject, Post } from '@nestjs/common';
import { Authentication } from 'src/domain/usecases';
import { EmailValidation } from 'src/validation/validators';

@Controller('login')
export class LoginController {
  constructor(
    @Inject('AUTHENTICATION') private readonly authentication: Authentication,
    @Inject('EMAIL_VALIDATION') private readonly emailValidation: EmailValidation
  ) {}

  @Post()
  async handle({ email, password }: Authentication.Params): Promise<Authentication.Result | Error> {
    const { isValid, error } = this.emailValidation.validate(email)
    if (!isValid) {
      return error
    }
    const auth = await this.authentication.auth({ email, password })
    return { accessToken: auth.accessToken }
  }
}
