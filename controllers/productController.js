// controllers/productController.js

const getProducts = async (req, res) => {
    try {
      // Mock data (later you can replace this with database fetching)
      const products = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Doe' },
      ];
  
      return res.status(200).json({
        success: true,
        message: 'Products fetched successfully',
        data: products,
      });
    } catch (error) {
      console.error('Error fetching products:', error);
  
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch products',
        error: error.message,
      });
    }
  };
  
  module.exports = {
    getProducts,
  };
  