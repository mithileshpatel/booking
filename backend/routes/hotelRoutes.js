const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotelController');
const multer = require('multer');
const path = require('path');

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure this path is correct
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename file with timestamp
  }
});
const upload = multer({ storage });

// Define routes
router.post('/add', upload.single('hotelImage'), hotelController.addHotel);
router.get('/', hotelController.getHotels);

module.exports = router;
