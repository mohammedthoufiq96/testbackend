const express = require('express');
const router = express.Router();
const { getUsers } = require('../controller/userController');

// Define the GET route for fetching users
router.get('/', getUsers);

module.exports = router;