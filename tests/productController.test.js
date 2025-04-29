// tests/productController.test.js

const productController = require('../controllers/productController');
const { jest } = require('jest');

describe('productController', () => {
  describe('getProducts function', () => {
    beforeAll(() => {
      // Mock req, res, next using jest.fn()
      req = jest.fn();
      res = jest.fn();
      next = jest.fn();
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it('should return success status and products on successful fetch', async () => {
      const expectedResponse = {
        status: jest.fn(),
        json: jest.fn(),
        end: jest.fn(),
      };

      res.status.mockReturnThis(expectedResponse);
      res.json.mockReturnThis(expectedResponse);

      await productController.getProducts(req, res);

      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Products fetched successfully',
        data: expect.any(Array),
      });
    });

    it('should return error status and failure message on fetch failure', async () => {
      const errorMock = new Error('Test Error');
      req.on('error', () => errorMock);

      const expectedResponse = {
        status: jest.fn(),
        json: jest.fn(),
        end: jest.fn(),
      };

      res.status.mockReturnThis(expectedResponse);
      res.json.mockReturnThis(expectedResponse);

      await productController.getProducts(req, res);

      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Failed to fetch products',
        error: 'Test Error',
      });
    });

    it('should call next on successful fetch', async () => {
      const expectedResponse = {
        status: jest.fn(),
        json: jest.fn(),
        end: jest.fn(),
      };

      res.status.mockReturnThis(expectedResponse);
      res.json.mockReturnThis(expectedResponse);

      await productController.getProducts(req, res);

      expect(next).toHaveBeenCalledTimes(1);
    });

    it('should call next on fetch failure', async () => {
      const errorMock = new Error('Test Error');
      req.on('error', () => errorMock);

      const expectedResponse = {
        status: jest.fn(),
        json: jest.fn(),
        end: jest.fn(),
      };

      res.status.mockReturnThis(expectedResponse);
      res.json.mockReturnThis(expectedResponse);

      await productController.getProducts(req, res);

      expect(next).toHaveBeenCalledTimes(1);
    });
  });

  describe('import test', () => {
    it('should import productController correctly', () => {
      expect(productController).toBeInstanceOf(Function);
    });
  });
});