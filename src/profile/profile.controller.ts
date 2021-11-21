import { Body, Controller, Delete, Get, Headers, Patch } from '@nestjs/common';

import { ProfileService } from './profile.service';
import { MessageType, UserNoSecretData } from '../types';

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
  
  @Delete()
  async deleteProfile(@Body() userData: { email: string, password: string }, @Headers() headers): Promise<MessageType> {
    return await this.appService.deleteProfile(headers.authorization, userData) as MessageType
  }
}
