import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { AuthUserDataType } from 'src/types/modals';

describe('RegisterController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/register', async () => {
    const userData: AuthUserDataType = {    
      email: `${Math.random() * 10000}`,
      password: `${Math.random() * 10000}`
    }

    let textResult;
    await request(app.getHttpServer())
      .post('/register')
      .send(userData)
      .expect(201)
      .then((res) => {
        textResult = res.text
      })
    
    return expect(textResult.startsWith("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9")).toBe(true)
  });

  it('/register', async () => {
    const userData: AuthUserDataType = {    
      email: `aaa`,
      password: `${Math.random() * 10000}`
    }

    return await request(app.getHttpServer())
      .post('/register')
      .send(userData)
      .expect(201)
      .expect('{"error":"Invalid user"}')
  });
});
