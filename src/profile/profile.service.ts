import { Injectable } from '@nestjs/common';

import { prisma } from '../services/prisma';
import { decodeToken } from '../tools/DecodeToken';
import { AuthUserDataType, UserNoSecretData } from '../types/modals';

@Injectable()
export class ProfileService {
  async isInvalidUser(token: string): Promise<Boolean> {
    if (!token) return true

    const userDataDecoded = this.getDecodedUser(token);
    if (!userDataDecoded) return true

    const userDataFromDB: UserNoSecretData = await prisma.user.findFirst({ where: { email: userDataDecoded.email }}); 
    if (!userDataFromDB) return true
  }

  getDecodedUser(token: string): AuthUserDataType {
    return decodeToken(token) as AuthUserDataType;
  }

  async getUserProfile(token: string): Promise<UserNoSecretData | String> {
    if (await this.isInvalidUser(token)) return '{"error":"Invalid user"}'

    const userDataFromDB: UserNoSecretData = await prisma.user.findFirst({ where: { email: this.getDecodedUser(token).email }}); 

    return await {
      name: userDataFromDB.name ?? ""
    } as UserNoSecretData
  }
}
