const express = require('express');
const router = express.Router();
const { getUsers } = require('../controllers/userController');
const { getProducts } =  require('../controllers/productController')

// Define the GET route for fetching users
router.get('/', getUsers);
router.get('/prodects', getProducts);

module.exports = router;

