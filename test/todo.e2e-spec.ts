import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { HttpStatus, INestApplication } from '@nestjs/common';

describe('TodoController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await clearDB();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/todos (GET) without authentication returns 401', () => {
    return request(app.getHttpServer())
      .get('/todos')
      .expect(HttpStatus.UNAUTHORIZED);
  });

  it('/todos/:id (GET) without authentication returns 401', () => {
    return request(app.getHttpServer())
      .get('/todos/1')
      .expect(HttpStatus.UNAUTHORIZED);
  });

  it('/todos (POST) without authentication returns 401', () => {
    return request(app.getHttpServer())
      .post('/todos')
      .send({ title: 'title', deadline: null })
      .expect(HttpStatus.UNAUTHORIZED);
  });

  it('/todos/:id (PUT) without authentication returns 401', () => {
    return request(app.getHttpServer())
      .put('/todos/1')
      .send({ title: 'title', deadline: null, isDone: false })
      .expect(HttpStatus.UNAUTHORIZED);
  });

  it('/todos:id (DELETE) without authentication returns 401', () => {
    return request(app.getHttpServer())
      .delete('/todos/1')
      .expect(HttpStatus.UNAUTHORIZED);
  });
});

async function clearDB() {
  // TODO Clear database
}
