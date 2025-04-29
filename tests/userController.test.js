// tests/controllers/userController.test.js

const UserController = require('../controllers/userController');
const req = jest.fn();
const res = jest.fn();
const next = jest.fn();

describe('UserController', () => {
  beforeEach(() => {
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn().mockReturnValue(res);
    res.status(500).json = jest.fn().mockReturnValue(res);
  });

  afterEach(() => {
    req.mockReset();
    res.mockReset();
    next.mockReset();
  });

  it('should return users on successful request', async () => {
    const users = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Doe' },
    ];

    req.body = {};
    req.query = {};

    await UserController.getUsers(req, res);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: 'Users fetched successfully',
      data: users,
    });
  });

  it('should return error on database fetch failure', async () => {
    const error = new Error('Mock Database Fetch Failure');

    req.body = {};
    req.query = {};

    UserController.getUsers.mockImplementationOnce(async () => {
      throw error;
    });

    await UserController.getUsers(req, res);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Failed to fetch users',
      error: String(error),
    });
  });

  it('should return error if req or res is not defined', () => {
    UserController.getUsers.mockImplementationOnce(() => {});

    expect(() => UserController.getUsers(undefined, res)).toThrowError();
    expect(() => UserController.getUsers(req, undefined)).toThrowError();
  });
});