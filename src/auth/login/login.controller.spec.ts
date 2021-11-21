import { Test, TestingModule } from '@nestjs/testing';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

describe('LoginController', () => {
  let loginController: LoginController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [LoginController],
      providers: [LoginService],
    }).compile();

    loginController = app.get<LoginController>(LoginController);
  });
  
  describe('root', () => {
    it('should return a string', async () => {
      const loginResult = await loginController.loginUser({
        email: "aaaa",
        password: "kdsak"
      });
      expect(loginResult).toBeTruthy();
    });
  });

  describe('root', () => {
    it('should return a string', async () => {
      const loginResult = await loginController.loginUser({
        email: "aaaa",
        password: "kdsa"
      });
      expect(loginResult).toBe('{"error":"Invalid user"}');
    });
  });
});
