const db = require('../config/dbConfig');
const path = require('path');
const fs = require('fs');


// Add Bus
exports.addBus = async (req, res) => {
  const { busName, busNumber, busType, seatingCapacity, route, startLocation, endLocation, departureTime, arrivalTime, fare } = req.body;
  const busImage = req.file ? req.file.filename : null;

  const sql = 'INSERT INTO buses (name, number, type, seating_capacity, route, start_location, end_location, departure_time, arrival_time, image, fare) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [busName, busNumber, busType, seatingCapacity, route, startLocation, endLocation, departureTime, arrivalTime, busImage, fare];

  try {
    const [result] = await db.query(sql, values);
    res.status(201).json({ message: 'Bus added successfully', id: result.insertId });
  } catch (error) {
    console.error('Error adding bus:', error);
    res.status(500).json({ message: 'Failed to add bus', error: error.message });
  }
};

// Get All Buses
exports.getBuses = async (req, res) => {
  try {
    const sql = 'SELECT * FROM buses';
    const [rows] = await db.query(sql);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching buses:', error);
    res.status(500).json({ message: 'Failed to fetch buses', error: error.message });
  }
};

// Search Buses
exports.searchBuses = async (req, res) => {
  const { startLocation, endLocation, startDate } = req.query;
  const sql = 'SELECT * FROM buses WHERE start_location = ? AND end_location = ? AND departure_time >= ?';
  const values = [startLocation, endLocation, startDate];

  try {
    const [rows] = await db.query(sql, values);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error searching buses:', error);
    res.status(500).json({ message: 'Failed to search buses', error: error.message });
  }
};

// Add Bus Amenity
// Add Bus Amenity
exports.addAmenity = async (req, res) => {
  const { busId, amenityName, description, amenityType } = req.body;
  const amenityImage = req.file ? req.file.filename : null;

  const sql = 'INSERT INTO bus_amenities (bus_id, amenity_name, description, amenity_type, amenity_image) VALUES (?, ?, ?, ?, ?)';
  const values = [busId, amenityName, description, amenityType, amenityImage];

  try {
    // Ensure the busId exists in the buses table
    const [busCheck] = await db.query('SELECT id FROM buses WHERE id = ?', [busId]);
    if (busCheck.length === 0) {
      return res.status(400).json({ message: 'Invalid bus ID' });
    }

    await db.query(sql, values);
    res.status(201).json({ message: 'Amenity added successfully' });
  } catch (error) {
    console.error('Error adding amenity:', error);
    res.status(500).json({ message: 'Failed to add amenity', error: error.message });
  }
};

// Add Bus Seat
exports.addBusSeat = async (req, res) => {
  const { busId, seatNumber, deck } = req.body;

  const sql = 'INSERT INTO bus_seats (bus_id, seat_number, deck, is_booked) VALUES (?, ?, ?, 0)';
  const values = [busId, seatNumber, deck];

  try {
    // Ensure the busId exists in the buses table
    const [busCheck] = await db.query('SELECT id FROM buses WHERE id = ?', [busId]);
    if (busCheck.length === 0) {
      return res.status(400).json({ message: 'Invalid bus ID' });
    }

    await db.query(sql, values);
    res.status(201).json({ message: 'Bus seat added successfully' });
  } catch (error) {
    console.error('Error adding bus seat:', error);
    res.status(500).json({ message: 'Failed to add bus seat', error: error.message });
  }
};

// Add Boarding/Dropping Point
exports.addBoardingDroppingPoint = async (req, res) => {
  const { busId, pointName, address, time, type } = req.body;

  // SQL query to insert a new boarding/dropping point
  const sql = 'INSERT INTO boarding_dropping_points (bus_id, point_name, address, time, type) VALUES (?, ?, ?, ?, ?)';
  const values = [busId, pointName, address, time, type];

  try {
    // Check if the busId exists in the buses table
    const [busCheck] = await db.query('SELECT id FROM buses WHERE id = ?', [busId]);
    if (busCheck.length === 0) {
      return res.status(400).json({ message: 'Invalid bus ID' });
    }

    // Insert the new boarding/dropping point into the database
    await db.query(sql, values);
    res.status(201).json({ message: 'Boarding/Dropping point added successfully' });
  } catch (error) {
    console.error('Error adding boarding/dropping point:', error);
    res.status(500).json({ message: 'Failed to add boarding/dropping point', error: error.message });
  }
};

// Add Bus Review
exports.addBusReview = async (req, res) => {
  const { busId, customerName, rating, reviewText, reviewDate } = req.body;

  const sql = 'INSERT INTO bus_reviews (bus_id, customer_name, rating, review_text, review_date) VALUES (?, ?, ?, ?, ?)';
  const values = [busId, customerName, rating, reviewText, reviewDate];

  try {
    // Ensure the busId exists in the buses table
    const [busCheck] = await db.query('SELECT id FROM buses WHERE id = ?', [busId]);
    if (busCheck.length === 0) {
      return res.status(400).json({ message: 'Invalid bus ID' });
    }

    await db.query(sql, values);
    res.status(201).json({ message: 'Review added successfully' });
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ message: 'Failed to add review', error: error.message });
  }
};

// Add Booking Policy
exports.addBookingPolicy = async (req, res) => {
  const { busId, policyTitle, policyDescription } = req.body;

  // SQL query for inserting a new booking policy
  const sql = 'INSERT INTO booking_policies (bus_id, policy_title, policy_description) VALUES (?, ?, ?)';
  const values = [busId, policyTitle, policyDescription];

  try {
    // Check if the bus ID exists in the buses table
    const [busCheck] = await db.query('SELECT id FROM buses WHERE id = ?', [busId]);
    if (busCheck.length === 0) {
      return res.status(400).json({ message: 'Invalid bus ID' });
    }

    // Insert the new booking policy into the booking_policies table
    await db.query(sql, values);
    res.status(201).json({ message: 'Booking policy added successfully' });
  } catch (error) {
    console.error('Error adding booking policy:', error);
    res.status(500).json({ message: 'Failed to add booking policy', error: error.message });
  }
};
exports.getBusSeats = async (req, res) => {
  try {
    const busId = req.params.busId;
    const seats = await db.query('SELECT * FROM bus_seats WHERE bus_id = ?', [busId]);
    res.json(seats[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve bus seats' });
  }
};

exports.getBusAmenities = async (req, res) => {
  try {
    const busId = req.params.busId;
    const amenities = await db.query('SELECT * FROM bus_amenities WHERE bus_id = ?', [busId]);
    res.json(amenities[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve bus amenities' });
  }
};

exports.getBoardingDroppingPoints = async (req, res) => {
  try {
    const busId = req.params.busId;
    const points = await db.query('SELECT * FROM boarding_dropping_points WHERE bus_id = ?', [busId]);
    res.json(points[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve boarding & dropping points' });
  }
};

exports.getBusReviews = async (req, res) => {
  try {
    const busId = req.params.busId;
    const reviews = await db.query('SELECT * FROM bus_reviews WHERE bus_id = ?', [busId]);
    res.json(reviews[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve bus reviews' });
  }
};

exports.getBookingPolicies = async (req, res) => {
  try {
    const busId = req.params.busId;
    const policies = await db.query('SELECT * FROM booking_policies WHERE bus_id = ?', [busId]);
    res.json(policies[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve booking policies' });
  }
};