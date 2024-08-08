const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const hotelRoutes = require('./routes/hotelRoutes');
const busRoutes = require('./routes/busRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = 5000;

// Configure Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads')); // Serve static files from uploads directory

// Set up routes
app.use('/api/hotels', hotelRoutes);
app.use('/api/buses', busRoutes);
app.use('/api/signup', userRoutes);
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});


// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
