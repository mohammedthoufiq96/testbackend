

// userController.js
const db = require('./db');
const express = require('express');

const router = express.Router();

const getUsers = async (req, res) => {
    try {
        const users = await db.getUsers();
        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to get users' });
    }
};

module.exports = { getUsers };

// userController.test.js
const express = require('express');
const request = require('supertest');
const app = express();
require('./db');
const { getUsers } = require('../controllers/userController');

jest.mock('../controllers/db');

describe('getUsers', () => {
    beforeEach(() => {
        // Mock db service to return users on every call
        db.getUsers.mockReturnValue([
            { id: 1, name: 'John Doe' },
            { id: 2, name: 'Jane Doe' },
        ]);
    });

    it('should get users successfully', async () => {
        const res = await request(app).get('/users');
        expect(res.status).toBe(200);
        expect(res.json).toHaveBeenCalledTimes(1);
        expect(res.json().mock.calls[0][0]).toEqual([
            { id: 1, name: 'John Doe' },
            { id: 2, name: 'Jane Doe' },
        ]);
    });

    it('should return error on db failure', async () => {
        const res = await request(app).get('/users');
        expect(res.status).toBe(500);
        expect(res.json).toHaveBeenCalledTimes(1);
        expect(res.json().mock.calls[0][0]).toEqual({ message: 'Failed to get users' });
    });

    it('should handle edge cases', async () => {
        const res = await request(app).get('/users');
        // Additional test cases can be added here
    });
});