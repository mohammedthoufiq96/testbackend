

const getProducts = require('../controller/productController');
const request = jest.fn();
const response = jest.fn();

describe('getProducts', () => {
  describe('success case', () => {
    beforeEach(() => {
      response.status.mockReset();
    });

    it('returns a JSON response with users data', async () => {
      await getProducts(request, response);
      expect(response.status).toHaveBeenCalledTimes(1);
      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.json).toHaveBeenCalledTimes(1);
      expect(response.json).toHaveBeenCalledWith({
        users: [
          { id: 1, name: 'John Doe' },
          { id: 2, name: 'Jane Doe' },
        ],
      });
    });

    it('calls the next middleware function', async () => {
      await getProducts(request, response);
      expect(response.next).toHaveBeenCalledTimes(0);
      jest.mocked(getProducts).mockRestore();
      await getProducts(request, response);
      expect(response.next).toHaveBeenCalledTimes(1);
    });
  });

  describe('error case - invalid status code', () => {
    beforeEach(() => {
      response.status.mockReset();
    });

    it('throws an error with the provided status code', async () => {
      try {
        await getProducts(request, response);
        expect.fail('Expected an error to be thrown');
      } catch (error) {
        expect(error.code).toBe('http')
          .and.isRequired;
        expect(error.message).toBe('Invalid HTTP Status Code: 123')
          .and.toBeGreaterThan(0)
          .and.numberOfMatches(1);
      }
    });
  });

  describe('error case - invalid response type', () => {
    beforeEach(() => {
      response.status.mockReset();
    });

    it('throws an error with the provided response type', async () => {
      try {
        await getProducts(request, response);
        expect.fail('Expected an error to be thrown');
      } catch (error) {
        expect(error.code).toBe('http')
          .and.isRequired;
        expect(error.message).toBe('Unexpected value: undefined')
          .and.toBeGreaterThan(0)
          .and.numberOfMatches(1);
      }
    });

    it('throws an error with the provided response type - void', async () => {
      try {
        await getProducts(request, null);
        expect.fail('Expected an error to be thrown');
      } catch (error) {
        expect(error.code).toBe('http')
          .and.isRequired;
        expect(error.message).toBe('Unexpected value: undefined')
          .and.toBeGreaterThan(0)
          .and.numberOfMatches(1);
      }
    });
  });

  describe('missing controller function', () => {
    it('throws an error', () => {
      try {
        require('./getProductsNonExistent');
        expect.fail('Expected a module not found error to be thrown');
      } catch (error) {
        expect(error.code).toBe('MODULE_NOT_FOUND')
          .and.isRequired;
      }
    });
  });
});