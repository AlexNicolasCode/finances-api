import { Module } from '@nestjs/common';
import { LoginModule } from './login/login.module';
import { SignUpModule } from './signup/signup.module';

@Module({
  imports: [LoginModule, SignUpModule],
  controllers: [],
  providers: [],
})
export class AuthModule {}
