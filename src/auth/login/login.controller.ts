import { Body, Controller, Post } from '@nestjs/common';

import { AuthUserDataType } from 'src/types/modals';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly appService: LoginService) {}

  @Post()
  async loginUser(@Body() userData: { email: String, password: String }): Promise<string> {
    return await this.appService.loginUser(userData as AuthUserDataType);
  }
}
