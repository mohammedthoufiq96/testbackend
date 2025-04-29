// tests/productController.test.js

const { getProducts } = require('../controllers/productController');

describe('Product Controller', () => {
  describe('getProducts function', () => {
    let req;
    let res;
    let next;

    beforeEach(() => {
      req = jest.fn();
      res = jest.fn();
      next = jest.fn();

      // Mock database service
      const dbServiceMock = require('../mocks/database.mock.js');
      delete require.cache[require.resolve('../controllers/productController')];
      require('../controllers/productController');

      // Reset mock functions
      req.resetMocks();
      res.resetMocks();
      next.resetMocks();

      getProducts(req, res, next);
    });

    it('should return products successfully', async () => {
      const expectedResponse = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Doe' },
      ];

      req.execute.mockResolvedValueOnce(expectedResponse);

      await getProducts(req, res, next);
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledTimes(1);
    });

    it('should return error message on failure', async () => {
      const expectedError = new Error('Test error');
      req.execute.mockRejectedValueOnce(expectedError);

      await getProducts(req, res, next);
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  // Additional tests...
});