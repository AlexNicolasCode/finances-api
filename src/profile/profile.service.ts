import { Injectable } from '@nestjs/common';

import { encondePassword } from '../auth/encode-password';
import { UserType } from '../types/modals';
import { prisma } from '../services/prisma';
import { decodeToken } from '../tools/DecodeToken';
import { AuthUserDataType, MessageType, UserNoSecretData } from '../types';

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

  async getUserData(token: string): Promise<UserType> {
    return await prisma.user.findFirst({ where: { email: this.getDecodedUser(token).email }}); 
  }

  async getUserProfile(token: string): Promise<UserNoSecretData | string> {
    if (await this.isInvalidUser(token)) return '{"error":"Invalid user"}'
    
    const user = await this.getUserData(token);
    return {
      name: user.name ?? ""
    }
  }

  async updateProfile(token: string, userUpdated: UserType): Promise<UserNoSecretData | string> {
    if (await this.isInvalidUser(token)) return '{"error":"Invalid user"}'

    await prisma.user.update({ 
      where: { email: this.getDecodedUser(token).email },
      data: { ...userUpdated }
    });

    const user: UserType = await this.getUserData(token);
    return await {
      name: user.name,
      email: user.email,
    } as UserType
  }

  async deleteProfile(token: string, user: AuthUserDataType): Promise<MessageType | string> {
    if (await this.isInvalidUser(token)) return '{"error":"Invalid user"}';

    const up = await prisma.user.deleteMany({ 
      where: {
        email: user.email,
        password: encondePassword(user.password),
      }
    });

    return await this.getUserData(token) ? { message: "Invalid user" } : { message: "user deleted" }
  }
}
