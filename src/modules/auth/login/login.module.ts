import { Module } from '@nestjs/common';
import { makeDbAuthentication, makeLoginValidation } from 'src/main/factories/usecases';
import { LoginController } from './login.controller';

const authenticationFactory = {
  provide: 'AUTHENTICATION',
  useFactory: () => {
    return makeDbAuthentication()
  }
}

const emailValidationFactory = {
  provide: 'EMAIL_VALIDATION',
  useFactory: (email: string) => {
    return makeLoginValidation(email)
  }
}

@Module({
  imports: [],
  controllers: [LoginController],
  providers: [authenticationFactory, emailValidationFactory],
})
export class LoginModule {}
