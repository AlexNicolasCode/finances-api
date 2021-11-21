import { Body, Controller, Get, Headers, Patch } from '@nestjs/common';
import { UserNoSecretData } from 'src/types/modals';

import { ProfileService } from './profile.service';

@Controller('/profile')
export class ProfileController {
  constructor(private readonly appService: ProfileService) {}

  @Get()
  async getUserProfile(@Headers() headers): Promise<UserNoSecretData | string> {
    return await this.appService.getUserProfile(headers.authorization)
  }
  
  @Patch()
  async updateProfile(@Body() newUserData, @Headers() headers): Promise<UserNoSecretData | string> {
    return await this.appService.updateProfile(headers.authorization, newUserData)
  }
}
