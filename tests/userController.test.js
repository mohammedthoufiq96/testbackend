

const { getUsers } = require('../controller/userController');

describe('getUsers', () => {
  it('should return a list of users with status 200', async () => {
    const mockReq = {};
    const mockRes = jest.fn().mockReturnThis();
    const mockNext = jest.fn();

    await getUsers(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledTimes(1);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledTimes(1);
  });

  it('should return an error with status 500 if no users found', async () => {
    const mockReq = {};
    const mockRes = jest.fn().mockReturnThis();
    const mockNext = jest.fn();

    await getUsers(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledTimes(1);
    expect(mockRes.status).toHaveBeenCalledWith(500);
  });

  it('should call next() if no error', async () => {
    const mockReq = {};
    const mockRes = jest.fn().mockReturnThis();
    const mockNext = jest.fn();

    await getUsers(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalledTimes(1);
  });

  it('should throw an error if req object is missing', () => {
    expect(() => getUsers(undefined)).toThrowError(
      'req object is required'
    );
  });
});