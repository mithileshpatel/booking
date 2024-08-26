const express = require('express');
const router = express.Router();
const busController = require('../controllers/busController');
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

// Routes for managing buses
router.post('/add', upload.single('busImage'), busController.addBus);  // Route to add a new bus with an image
router.get('/', busController.getBuses); // Route to get all buses
router.get('/search', busController.searchBuses); // Route to search buses by criteria

// Routes for managing bus amenities
router.post('/bus_amenities/add', upload.single('amenityImage'), busController.addAmenity); // Route to add an amenity with an image

// Routes for managing bus seats
router.post('/seats/add', busController.addBusSeat); // Route to add a bus seat

// Routes for managing boarding and dropping points
router.post('/boardingDroppingPoints/add', busController.addBoardingDroppingPoint); // Route to add boarding/dropping points

// Routes for managing bus reviews
router.post('/reviews/add', busController.addBusReview); // Route to add a bus review

// Routes for managing booking policies
router.post('/booking_policies/add', busController.addBookingPolicy); // Route to add a booking policy

module.exports = router;
