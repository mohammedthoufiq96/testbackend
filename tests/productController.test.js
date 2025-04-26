

const express = require('express');
const router = express.Router();
const getProducts = require('../src/getProducts');

describe('getProducts function', () => {
    it('should return a 200 status code and an array of user objects', async () => {
        const req = { status: jest.fn() };
        const res = { json: jest.fn() };

        getProducts(req, res);

        expect(res.status).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(200);

        expect(res.json).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledWith({
            users: [
                { id: 1, name: 'John Doe' },
                { id: 2, name: 'Jane Doe' },
            ],
        });
    });

    it('should not change the request object', () => {
        const req = { status: jest.fn() };
        const res = { json: jest.fn() };

        getProducts(req, res);

        expect(req.status).toHaveBeenCalledTimes(0);
    });
});