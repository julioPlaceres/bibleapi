import 'reflect-metadata';
import { Server } from 'http';
import request from 'supertest';
import getExpressApp from '../../app';
import { getRepository } from 'typeorm';
import { HistoricalEvent } from '../../entity/HistoricalEvent';

let server: Server;

beforeAll(async () => {
    const app = await getExpressApp();
    server = app.listen();
});

beforeEach(async () => {
    // Insert a book into the `book` table before each test
    const event1 = new HistoricalEvent();
    const event2 = new HistoricalEvent();
    const event3 = new HistoricalEvent();

    event1.name = "The Beginning";
    event2.name = "The Exit";
    event3.name = "The Promise Land";

    const repository = getRepository(HistoricalEvent);
    await repository.save(event1);
    await repository.save(event2);
    await repository.save(event3);
});

afterAll(done => {
    if (server) {
        server.close(done); // Close the server after the tests
    } else {
        done();
    }
});

describe('GET /events', () => {
    it('should return 200 & valid response if request is valid', async () => {
        const res = await request(server).get('/events'); // Pass server instead of app

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    }, 10000);
});
