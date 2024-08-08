const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define routes
router.post('/signup', userController.signup);
router.get('/', userController.getUsers); // Route to get users
router.post('/delete', userController.deleteUsers); // Route for deleting users

module.exports = router;
