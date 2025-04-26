const request = require('supertest')
import app from './app.js';

describe('GET /users', () => {
  it('should return a successful response with users data', async () => {
    const req = { method: 'GET' };
    const res = {
      status: jest.fn(),
      json: jest.fn(),
    };

    await request(app).get('/users').send(req).expect(200);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledTimes(1);
  });

  it('should return an error response with a 404 status', async () => {
    const req = { method: 'GET' };
    const res = {
      status: jest.fn(),
      json: jest.fn(),
    };

    await request(app).get('/non-existent-route').send(req).expect(404);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.json).not.toHaveBeenCalled();
  });
});