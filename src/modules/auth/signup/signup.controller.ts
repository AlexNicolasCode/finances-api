import { Controller, Inject, Post } from '@nestjs/common';
import { AddAccount, Authentication } from 'src/domain/usecases';
import { ok } from 'src/presentation/helpers';
import { HttpResponse, Validator } from 'src/presentation/protocols';

@Controller('signup')
export class SignUpController {
  constructor(
    @Inject('ADD_ACCOUNT') private readonly addAccount: AddAccount,
    @Inject('AUTHENTICATION') private readonly authentication: Authentication,
    @Inject('EMAIL_VALIDATION') private readonly validation: Validator
  ) {}

  @Post()
  async handle({ email, password }: Authentication.Params): Promise<HttpResponse> {
    try {
        const { error } = this.validation.validate(email)
        if (error) {
          return error
        }
        const isValid = await this.addAccount.add({
            email,
            password
        })
        if (!isValid) {
            return new Error('This account already exists')
        }
        const auth = await this.authentication.auth({ 
            email, 
            password
        })
        return ok({ accessToken: auth.accessToken })
    } catch(e) {
        return new Error('Internal server error')
    }
  }
}
