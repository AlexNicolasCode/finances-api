import { Test, TestingModule } from '@nestjs/testing';
import { UserNoSecretData } from 'src/types/modals';
import { RegisterController } from '../auth/register/register.controller';
import { RegisterService } from '../auth/register/register.service';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

describe('ProfileController', () => {
  let profileController: ProfileController;
  let registerController: RegisterController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController],
      providers: [ProfileService],
    }).compile();

    profileController = app.get<ProfileController>(ProfileController);

    const appRegister: TestingModule = await Test.createTestingModule({
      controllers: [RegisterController],
      providers: [RegisterService],
    }).compile();

    registerController = appRegister.get<RegisterController>(RegisterController);
  });

  describe('root', () => {
    it('get user name', async () => {
      const token = await registerController.createAccount({
        name: "user",
        email: `${Math.random() * 10000}`,
        password: "kdsak",
      });

      const profileResult = await profileController.getUserProfile({ authorization: token, }) as UserNoSecretData;
      expect(profileResult.name).toBe("user")
    });

    it('token without data', async () => {
      const profileResult = await profileController.getUserProfile({ 
        authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNTE2MjM5MDIyfQ.L8i6g3PfcHlioHCCPURC9pmXT7gdJpx3kOoyAfNUwCc', 
      }) as String;
      expect(profileResult).toBe('{"error":"Invalid user"}')
    });

    it('invalid token', async () => {
      const profileResult = await profileController.getUserProfile({ authorization: '', }) as String;
      expect(profileResult).toBe('{"error":"Invalid user"}')
    });
  });
});
