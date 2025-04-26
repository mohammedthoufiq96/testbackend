import undefined from '../src/productController.js';

const getProducts = require('./getProducts');

jest.mock('express', () => ({
  Request: jest.fn(),
  Response: class {
    json = jest.fn();
    status = jest.fn(() => this);
    send = jest.fn((status, data) => {
      if (arguments.length === 2) {
        return this.json(data);
      }
      return this.status(status);
    });
  },
}));

describe('getProducts controller', () => {
  let req;
  let res;

  beforeEach(() => {
    req = new jest.MockedExpressRequest();
    res = new jest.MockedExpressResponse();
  });

  it('should return a 200 status with mock data when no error occurs', async () => {
    getProducts(req, res);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({
      users: [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Doe' },
      ],
    });
  });

  it('should return a 500 status with an error when an internal server error occurs', async () => {
    const throwNewError = jest.fn();

    getProducts(req, res);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.json).not.toHaveBeenCalled();
    expect(throwNewError).toHaveBeenCalledTimes(1);
  });

  it('should return a 404 status with an error when no data is available', async () => {
    req.query = {};

    getProducts(req, res);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.json).not.toHaveBeenCalled();
    expect(res.send).toHaveBeenCalledTimes(1);
  });
});