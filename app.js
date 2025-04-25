const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');

app.use(express.json()); // Middleware to parse JSON requests
app.use('/api/users', userRoutes); // Using userRoutes for API

module.exports = app;