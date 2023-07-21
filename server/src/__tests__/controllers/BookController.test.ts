import 'reflect-metadata';
import { Server } from 'http';
import request from 'supertest';
import getExpressApp from '../../app';
import { getRepository } from 'typeorm';
import { Book } from '../../entity/Book';

let server: Server;

beforeAll(async () => {
  const app = await getExpressApp();
  server = app.listen();
});

beforeEach(async () => {
  // Insert a book into the `book` table before each test
  const book1 = new Book();
  const book2 = new Book();
  const book3 = new Book();

  book1.name = "Genesis";
  book2.name = "Exodus";
  book3.name = "Leviticus";

  const repository = getRepository(Book);
  await repository.save(book1);
  await repository.save(book2);
  await repository.save(book3);
});

afterAll(done => {
  if (server) {
    server.close(done); // Close the server after the tests
  } else {
    done();
  }
});

describe('GET /books', () => {
  it('should return 200 & valid response if request is valid', async () => {
    const res = await request(server).get('/books'); // Pass server instead of app

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  }, 10000);
});
