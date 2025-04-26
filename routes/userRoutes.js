const express = require('express');
const router = express.Router();
const { getUsers } = require('../controller/userController');
const { getProducts } =  require('../controller/productController')

// Define the GET route for fetching users
router.get('/', getUsers);
router.get('/prodects', getProducts);

module.exports = router;

