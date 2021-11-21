import { Body, Controller, Post } from '@nestjs/common';

import { AuthUserDataType } from '../../types';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly appService: LoginService) {}

  @Post()
  async loginUser(@Body() userData: { email: string, password: string }): Promise<string> {
    return await this.appService.loginUser(userData as AuthUserDataType);
  }
}
