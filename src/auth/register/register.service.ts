import { Injectable } from '@nestjs/common';

import { getToken } from '../get-token';
import { encondePassword } from '../encode-password';
import { prisma } from '../../services/prisma';
import { AuthUserDataType } from '../../types';

@Injectable()
export class RegisterService {
  async createAccount({ name, email, password }: AuthUserDataType): Promise<string> {
    
    if (await prisma.user.findFirst({ where: { email: email }})) return '{"error":"Invalid user"}'

    await prisma.user.create({ 
      data: {
        name: name,
        email: email,
        password: encondePassword(password),
        createdAt: String(new Date)
      }
    })

    return getToken(email);
  }
}
