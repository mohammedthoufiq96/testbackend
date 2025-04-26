

const express = require('express');
const app = express();

const getProducts = require('../controller/productController');

describe('getProducts function', () => {
  let req, res;
  beforeEach(() => {
    req = { query: {} };
    res = { status: jest.fn(), json: jest.fn() };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a JSON response with users data on happy path', async () => {
    getProducts(req, res);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json.mock.calls[0][0]).toEqual({
      users: [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Doe' },
      ],
    });
  });

  it('should throw an error if res.status is not a function', () => {
    req = { query: {} };
    const originalStatus = jest.spyOn(res, 'status');
    try {
      getProducts(req, res);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
    expect(originalStatus).not.toHaveBeenCalled();
  });

  it('should return a JSON response with users data on success', async () => {
    req = { query: {} };
    res.json.mockImplementation(() => ({}));
    getProducts(req, res);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledTimes(1);
  });

  it('should throw an error if res.json is not a function', () => {
    req = { query: {} };
    const originalJson = jest.spyOn(res, 'json');
    try {
      getProducts(req, res);
    } catch (error) {}
    expect(originalJson).not.toHaveBeenCalled();
  });
});