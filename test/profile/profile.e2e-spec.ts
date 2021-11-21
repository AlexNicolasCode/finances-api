import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from '../../src/app.module';
import { AuthUserDataType, UserNoSecretData } from 'src/types/modals';

describe('LoginController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('invalid token in /profile', async () => {
    let textResult: String;
    await request(app.getHttpServer())
      .get('/profile')
      .set('Authorization', 'testing')
      .expect(200)  
      .then((res) => {
        textResult = res.text
      })
      
    return expect(textResult).toBe("{\"error\":\"Invalid user\"}")
  });

  it('no token on /profile', async () => {
    let textResult: String;
    await request(app.getHttpServer())
      .get('/profile')
      .expect(200)  
      .then((res) => {
        textResult = res.text
      })
      
    return expect(textResult).toBe("{\"error\":\"Invalid user\"}")
  });

  it('valid token in /profile', async () => {
    const userData: AuthUserDataType = { 
      name: "test",   
      email: `${Math.random() * 10000}`,
      password: `${Math.random() * 10000}`
    }

    let token: string;
    await request(app.getHttpServer())
      .post('/register')
      .send(userData)
      .expect(201)
      .then((res) => {
        token = res.text
      })


    let textResult: UserNoSecretData;
    await request(app.getHttpServer())
      .get('/profile')
      .set(
        'Authorization', 
        token
      )
      .expect(200)  
      .then((res) => {
        textResult = res.text as UserNoSecretData
      })
      
    return expect(textResult).toBe('{"name":"test"}')
  });

  it('update user in /profile', async () => {
    const userData: AuthUserDataType = { 
      name: "test",   
      email: `${Math.random() * 10000}`,
      password: `${Math.random() * 10000}`
    }

    let token: string;
    await request(app.getHttpServer())
      .post('/register')
      .send(userData)
      .expect(201)
      .then((res) => {
        token = res.text
      })


    let textResult: UserNoSecretData;
    await request(app.getHttpServer())
      .patch('/profile')
      .set(
        'Authorization', 
        token
      )
      .send({ name: "potato" })
      .expect(200)  
      .then((res) => {
        textResult = res.text as UserNoSecretData
      })
      
    return expect(textResult).toBe(`{\"name\":\"potato\",\"email\":\"${userData.email}\"}`)
  });
});
