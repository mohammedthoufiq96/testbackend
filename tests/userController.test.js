// tests/controllers/userController.test.js

const UserController = require('../controllers/userController');

describe('UserController', () => {
  const req = jest.fn();
  const res = jest.fn();
  const next = jest.fn();

  beforeEach(() => {
    req.user = null;
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn().mockReturnThis();
    res.status(500).json = jest.fn().mockReturnThis();
    next.mockClear();
  });

  afterEach(() => {
    req.resetAll();
    res.resetAll();
    next.resetAll();
  });

  it('should return users data when fetching succeeds', async () => {
    const userData = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Doe' },
    ];

    jest.spyOn(req, 'user').mockReturnValue(userData);

    await UserController.getUsers(req, res, next);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: 'Users fetched successfully',
      data: userData,
    });
  });

  it('should return error when fetching fails', async () => {
    const error = new Error('Mock database error');

    jest.spyOn(req, 'user').mockReturnValue(null);
    jest.spyOn(UserController.database, 'fetchUsers').mockThrow(error);

    await UserController.getUsers(req, res, next);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Failed to fetch users',
      error: String(error),
    });
  });

  it('should call next when no user data is provided', async () => {
    await UserController.getUsers(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
  });
});