

const express = require('express');
const request = require('supertest');
const getUsers = require('../controller/userController')

describe('getUsers function', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.get('/', getUsers);
  });

  describe('Happy Path Test', () => {
    it('returns 200 and users array with mock data', async () => {
      const response = await request(app).get('/users');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        users: [
          { id: 1, name: 'John Doe' },
          { id: 2, name: 'Jane Doe' },
        ],
      });
    });
  });

  describe('Error Handling Test', () => {
    it('throws an error when req object is not defined', async () => {
      expect(() => getUsers(undefined, {})).toThrow('req is not defined');
    });

    it('throws an error when res object is not defined', async () => {
      expect(() => getUsers({}, { status: '500' })).toThrow('res is not defined');
    });
  });

  describe('Edge Case Test', () => {
    it('returns empty users array for no user data', async () => {
      const response = await request(app).get('/users');
      expect(response.status).toBe(200);
      expect(response.body.users.length).toBe(0);
    });
  });
});