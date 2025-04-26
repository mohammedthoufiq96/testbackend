

const request = require('supertest');
const express = require('express');

const app = express();
const userController = require('../controllers/userController');

describe('User Controller', () => {
    beforeEach(() => {
        app.use(express.json());
        app.use('/users', userController);
    });

    afterEach(() => {
        // Clean up
    });

    it('should return 200 when getting all products', async () => {
        const res = await request(app).get('/users');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            users: [
                { id: 1, name: 'John Doe' },
                { id: 2, name: 'Jane Doe' },
            ],
        });
    });

    it('should return error when getting products', async () => {
        const res = await request(app).get('/users');
        expect(res.statusCode).toBe(500);
    });

    // Add more tests for success, error, and edge cases
});