import {getUsers} from '../src/userController.js';

const express = require('express');
const app = express();
const users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Doe' }
];

app.get('/users', getUsers);

jest.mock('../index.js');

describe('getUsers function', () => {
  it('should return a JSON response with status code 200', async () => {
    const req = { params: {} };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await getUsers(req, res);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledTimes(1);
  });

  it('should return the expected users array', async () => {
    const req = { params: {} };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await getUsers(req, res);

    expect(res.json).toHaveBeenCalledWith({
      users: [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Doe' }
      ]
    });
  });

  it('should return the correct error if req.params is undefined', async () => {
    const req = {};
    const res = {
      status: jest.fn(),
      json: jest.fn()
    };

    await getUsers(req, res);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
  });
});