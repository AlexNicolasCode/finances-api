import { Body, Controller, Post } from '@nestjs/common';

import { AuthUserDataType } from 'src/types/modals';
import { RegisterService } from './register.service';

@Controller('/register')
export class RegisterController {
  constructor(private readonly appService: RegisterService) {}

  @Post()
  async createAccount(@Body() userData: { name: string, email: string, password: string }): Promise<string> {
    return await this.appService.createAccount(userData as AuthUserDataType);
  }
}
