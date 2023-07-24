import 'reflect-metadata';
import request from 'supertest';
import { server } from '../../setup';

describe('GET /rivers', () => {
    it('should return 200 & valid response if request is valid', async () => {
        const res = await request(server).get('/rivers'); // Pass server instead of app

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    }, 10000);
});
