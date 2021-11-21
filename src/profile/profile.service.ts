import { Injectable } from '@nestjs/common';

import { prisma } from '../services/prisma';
import { decodeToken } from '../tools/DecodeToken';
import { AuthUserDataType, UserNoSecretData } from '../types/modals';

@Injectable()
export class ProfileService {
  async getUserProfile(token): Promise<UserNoSecretData | String> {
    if (!token) return '{"error":"Invalid user"}'

    const userDataDecoded = decodeToken(token) as AuthUserDataType;
    if (!userDataDecoded) return '{"error":"Invalid user"}'

    const userDataFromDB: UserNoSecretData = await prisma.user.findFirst({ where: { email: userDataDecoded.email }}); 
    if (!userDataFromDB) return '{"error":"Invalid user"}'

    return await {
      name: userDataFromDB.name ?? ""
    } as UserNoSecretData
  }
}
