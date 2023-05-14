import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { TodoService } from '../src/todo/todo.service';

describe('TodoController (e2e)', () => {
  let app: INestApplication;
  let todoService: TodoService;

  const encodedUsernamePassword = Buffer.from(
    `${process.env.AUTH_USERNAME}:${process.env.AUTH_PASSWORD}`,
  ).toString('base64');

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    todoService = moduleFixture.get(TodoService);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/todos (GET)', () => {
    it('/todos (GET) with authentication returns 200', async () => {
      const test1 = await todoService.addTodoItem({
        title: 'test1',
        deadline: null,
      });
      const test2 = await todoService.addTodoItem({
        title: 'test2',
        deadline: null,
      });

      const response = await request(app.getHttpServer())
        .get('/todos')
        .set('authorization', `Basic ${encodedUsernamePassword}`);
      expect(response.statusCode).toEqual(HttpStatus.OK);
      expect(response.body[0]['id']).toEqual(test1.id);
      expect(response.body[0]['title']).toEqual(test1.title);
      expect(response.body[0]['deadline']).toEqual(test1.deadline);
      expect(response.body[1]['id']).toEqual(test2.id);
      expect(response.body[1]['title']).toEqual(test2.title);
      expect(response.body[1]['deadline']).toEqual(test2.deadline);
    });

    it('/todos (GET) without authentication returns 401', () => {
      return request(app.getHttpServer())
        .get('/todos')
        .expect(HttpStatus.UNAUTHORIZED);
    });
  });

  describe('/todos/:id (GET)', () => {
    it('/todos/:id (GET) with authentication returns 200', async () => {
      const newItem = await todoService.addTodoItem({
        title: 'test',
        deadline: null,
      });
      const response = await request(app.getHttpServer())
        .get(`/todos/${newItem.id}`)
        .set('authorization', `Basic ${encodedUsernamePassword}`);
      expect(response.statusCode).toEqual(HttpStatus.OK);
      expect(response.body['id']).toEqual(newItem.id);
      expect(response.body['title']).toEqual(newItem.title);
      expect(response.body['deadline']).toEqual(newItem.deadline);
    });

    it('/todos/:id (GET) with authentication and invalid id returns 404', async () => {
      return request(app.getHttpServer())
        .get('/todos/99999')
        .set('authorization', `Basic ${encodedUsernamePassword}`)
        .expect(HttpStatus.NOT_FOUND);
    });

    it('/todos/:id (GET) without authentication returns 401', () => {
      return request(app.getHttpServer())
        .get('/todos/1')
        .expect(HttpStatus.UNAUTHORIZED);
    });
  });

  describe('/todos/ (POST)', () => {
    async function validateCreateTodoCall(
      title: any,
      deadline: any,
      status: HttpStatus,
    ) {
      const response = await request(app.getHttpServer())
        .post('/todos')
        .set('authorization', `Basic ${encodedUsernamePassword}`)
        .send({
          title: title,
          deadline: deadline,
        });
      expect(response.statusCode).toEqual(status);
      if (status !== HttpStatus.CREATED) {
        return;
      }
      expect(response.body['title']).toEqual(title);
      expect(response.body['deadline']).toEqual(deadline);
    }

    it('/todos (POST) with authentication and valid data returns 201', async () => {
      await validateCreateTodoCall('title', null, HttpStatus.CREATED);
      await validateCreateTodoCall('title', '2023-02-01', HttpStatus.CREATED);
    });

    it('/todos (POST) with authentication and invalid data returns 400', async () => {
      await validateCreateTodoCall(null, null, HttpStatus.BAD_REQUEST);
      await validateCreateTodoCall(null, '2023-02-01', HttpStatus.BAD_REQUEST);
      await validateCreateTodoCall('title', '02-01', HttpStatus.BAD_REQUEST);
    });

    it('/todos (POST) without authentication returns 401', () => {
      return request(app.getHttpServer())
        .post('/todos')
        .send({ title: 'title', deadline: null })
        .expect(HttpStatus.UNAUTHORIZED);
    });
  });

  describe('/todos/:id (PUT)', () => {
    async function validatePutRequest(
      title: any,
      deadline: any,
      isDone: any,
      status: HttpStatus,
    ) {
      const newItem = await todoService.addTodoItem({
        title: 'test',
        deadline: null,
      });
      const response = await request(app.getHttpServer())
        .put(`/todos/${newItem.id}`)
        .set('authorization', `Basic ${encodedUsernamePassword}`)
        .send({ title: title, deadline: deadline, isDone: isDone });
      expect(response.statusCode).toEqual(status);
      if (status !== HttpStatus.CREATED) {
        return;
      }
      expect(response.body['title']).toEqual(title);
      expect(response.body['deadline']).toEqual(deadline);
      expect(response.body['isDone']).toEqual(isDone);
    }

    it('/todos/:id (PUT) with authentication, valid id, and valid data returns 200', async () => {
      await validatePutRequest('title', null, false, HttpStatus.OK);
    });

    it('/todos/:id (PUT) with authentication, valid id, and invalid data returns 400', async () => {
      await validatePutRequest('title', null, 'asfas', HttpStatus.BAD_REQUEST);
      await validatePutRequest('title', null, null, HttpStatus.BAD_REQUEST);
      await validatePutRequest('title', '21313', false, HttpStatus.BAD_REQUEST);
      await validatePutRequest(null, null, false, HttpStatus.BAD_REQUEST);
    });

    it('/todos/:id (PUT) with authentication and invalid id returns 404', async () => {
      return request(app.getHttpServer())
        .put(`/todos/9999`)
        .set('authorization', `Basic ${encodedUsernamePassword}`)
        .send({ title: 'title', deadline: null, isDone: false })
        .expect(HttpStatus.NOT_FOUND);
    });

    it('/todos/:id (PUT) without authentication returns 401', async () => {
      const newItem = await todoService.addTodoItem({
        title: 'test',
        deadline: null,
      });
      return request(app.getHttpServer())
        .put(`/todos/${newItem.id}`)
        .send({ title: 'title', deadline: null, isDone: false })
        .expect(HttpStatus.UNAUTHORIZED);
    });
  });

  describe('/todos/:id (DELETE)', () => {
    it('/todos:id (DELETE) with authentication returns 200', async () => {
      const newItem = await todoService.addTodoItem({
        title: 'test',
        deadline: null,
      });
      return request(app.getHttpServer())
        .delete(`/todos/${newItem.id}`)
        .set('authorization', `Basic ${encodedUsernamePassword}`)
        .expect(HttpStatus.OK);
    });

    it('/todos:id (DELETE) without authentication returns 401', async () => {
      const newItem = await todoService.addTodoItem({
        title: 'test',
        deadline: null,
      });
      return request(app.getHttpServer())
        .delete(`/todos/${newItem.id}`)
        .expect(HttpStatus.UNAUTHORIZED);
    });
  });
});
