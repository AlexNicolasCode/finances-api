import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from '../../src/app.module';
import { AuthUserDataType } from '../../src/types';

describe('LoginController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/login', async () => {
    const userData: AuthUserDataType = {
      email: "aaaa",
      password: "kdsak"
    }

    let textResult;
    await request(app.getHttpServer())
      .post('/login')
      .send(userData)
      .expect(201)  
      .then((res) => {
        textResult = res.text
      })
      
    return expect(textResult.startsWith("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9")).toBe(true)
  });
});
