import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Types, disconnect } from 'mongoose';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateReviewDto, EditReviewDto, GetByUserDto } from '../src/review/dto/review.dto';
/**
 * yarn test:e2e:watch
yarn test:e2e

 */
/**REVIEW */
const courseId = new Types.ObjectId().toHexString();
const authorId = new Types.ObjectId().toHexString();

const reviewDto: CreateReviewDto = {
  rating: 5,
  summary: 'Cool',
  author: authorId,
  course: courseId,
};

const editReviewDto: EditReviewDto = {
  rating: 3,
  summary: 'Good',
};
const getByUserDto: GetByUserDto = {
  user: authorId,
  course: courseId,
};

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let createdReviewId: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe()); //najot
    await app.init();
  });

  it('/review/create/ (POST)', async () => {
    return request(app.getHttpServer())
      .post('/review/create')
      .send(reviewDto)
      .expect(201)
      .then(({ body }: request.Response) => {
        createdReviewId = body;
        expect(createdReviewId).toBeDefined();
      });
  });
  it('/review/edit/:reviewId (EDIT)', async () => {
    return request(app.getHttpServer())
      .put('/review/edit/' + createdReviewId)
      .send(editReviewDto)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body).toBeDefined();
      });
  });
  it('/review/get/:courseId (GET) -success', async () => {
    return request(app.getHttpServer())
      .get('/review/get/' + courseId)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.length).toBe(1);
      });
  });
  it('/review/get/:courseId (GET) -failure', async () => {
    return request(app.getHttpServer())
      .get('/review/get/' + new Types.ObjectId().toHexString())
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.length).toBe(0);
      });
  });
  it('/review/get-by-user/ (POST) -success', async () => {
    return request(app.getHttpServer())
      .post('/review/get-by-user/')
      .send(getByUserDto)
      .expect(200)
      .then(({ body, status }: request.Response) => {
        // console.log('Response Status:', status);
        // console.log('Response Body:', body);
        expect(body).toBeDefined();
      });
  });
  it('/review/get-by-user/ (POST) -failure', async () => {
    return request(app.getHttpServer())
      .post('/review/get-by-user/')
      .send({
        course: courseId,
        user: new Types.ObjectId().toHexString(),
      })
      .expect(200)
      .then(({ body, status }: request.Response) => {
        // console.log('Response Status:', status);
        // console.log('Response Body:', body);
        expect(body).toBeDefined();
      });
  });

  it('/review/delete/:reviewId (DELETE) -success', async () => {
    return request(app.getHttpServer())
      .delete(`/review/delete/${createdReviewId}`)
      .expect(200)
      .then(({ body, status }: request.Response) => {
        // console.log('delete', status);
        // console.log('delete', body);
        expect(body).toBe(createdReviewId);
      });
  });
  it('/review/delete/:reviewId (DELETE) -failure', async () => {
    return request(app.getHttpServer())
      .delete(`/review/delete/${new Types.ObjectId().toHexString()}`)
      .expect(404)
      .then(({ body, status }: request.Response) => {
        console.log('delete', status);
        console.log('delete', body);
        expect(body).toBeDefined();
      });
  });

  afterAll(() => {
    app.close();
    disconnect();
  });
});
