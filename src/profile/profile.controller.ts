import { Controller, Get, Headers } from '@nestjs/common';
import { UserNoSecretData } from 'src/types/modals';

import { ProfileService } from './profile.service';

@Controller('/profile')
export class ProfileController {
  constructor(private readonly appService: ProfileService) {}

  @Get()
  async getUserProfile(@Headers() headers): Promise<UserNoSecretData | String> {
    return await this.appService.getUserProfile(headers.authorization)
  }
}
