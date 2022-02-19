import { Module } from '@nestjs/common';
import { makeDbAddAccount, makeDbAuthentication, makeLoginValidation } from 'src/main/factories/usecases';
import { SignUpController } from './signup.controller';

const addAccountFactory = {
  provide: 'ADD_ACCOUNT',
  useFactory: () => {
    return makeDbAddAccount()
  }
}

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
  controllers: [SignUpController],
  providers: [
      addAccountFactory, 
      authenticationFactory, 
      emailValidationFactory
    ],
})
export class SignUpModule {}
