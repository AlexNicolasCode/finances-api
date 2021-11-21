import { Test, TestingModule } from '@nestjs/testing';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';

describe('RegisterController', () => {
  let registerController: RegisterController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RegisterController],
      providers: [RegisterService],
    }).compile();

    registerController = app.get<RegisterController>(RegisterController);
  });

  describe('root', () => {
    it('should return a string', async () => {
      const RegisterResult = await registerController.createAccount({
        name: "user",
        email: `${Math.random() * 10000}`,
        password: "kdsak",
      });
      expect(RegisterResult).toBeTruthy()
    });

    it('should return a undefined', async () => {
      const RegisterResult = await registerController.createAccount({
        name: "user",
        email: `aaaa`,
        password: "kdsak",
      });
      expect(RegisterResult).toBe('{"error":"Invalid user"}')
    });
  });
});
