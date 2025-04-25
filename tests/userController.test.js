// tests/userController.test.js
const request = require('supertest');
const app = require('../app'); // Import the app

describe('GET /api/users', () => {
  it('should return a list of users', async () => {
    const response = await request(app).get('/api/users');
    expect(response.status).toBe(200); // Expecting a 200 status code
    expect(response.body).toHaveProperty('users'); // Checking if response has 'users'
    expect(response.body.users).toBeInstanceOf(Array); // Ensure 'users' is an array
  });
});
