import { Injectable } from '@nestjs/common';

import { prisma } from '../../services/prisma';
import { getToken } from '../get-token';
import { encondePassword } from '../encode-password';
import { AuthUserDataType } from '../../types';

@Injectable()
export class LoginService {
  async loginUser({ email, password }: AuthUserDataType): Promise<string> {
    if (!await prisma.user.findFirst({ 
      where: {
        email: email,
        password: encondePassword(password)
      }
    })) return '{"error":"Invalid user"}'

    return getToken(email);
  }
}
