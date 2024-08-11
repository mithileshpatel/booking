const db = require('../config/dbConfig');
const path = require('path');
<<<<<<< HEAD

// Add Bus
exports.addBus = async (req, res) => {
  const { busName, busNumber, busType, seatingCapacity, route, departureTime, arrivalTime } = req.body;
  const busImage = req.file ? req.file.filename : null;

  const sql = 'INSERT INTO buses (name, number, type, seating_capacity, route, departure_time, arrival_time, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [busName, busNumber, busType, seatingCapacity, route, departureTime, arrivalTime, busImage];
=======
const fs = require('fs');

// Add Bus
exports.addBus = async (req, res) => {
  const { busName, busNumber, busType, seatingCapacity, route, startLocation, endLocation, departureTime, arrivalTime, fare } = req.body;
  const busImage = req.file ? req.file.filename : null;

  // Construct SQL query with all fields
  const sql = 'INSERT INTO buses (name, number, type, seating_capacity, route, start_location, end_location, departure_time, arrival_time, image, fare) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [busName, busNumber, busType, seatingCapacity, route, startLocation, endLocation, departureTime, arrivalTime, busImage, fare];
>>>>>>> 1310a3f (CHANGES 12/08/2024)

  try {
    const [result] = await db.query(sql, values);
    res.status(201).json({ message: 'Bus added successfully', id: result.insertId });
  } catch (error) {
    console.error('Error adding bus:', error);
    res.status(500).json({ message: 'Failed to add bus' });
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
    res.status(500).json({ message: 'Failed to fetch buses' });
  }
};
<<<<<<< HEAD
=======
// busController.js
exports.searchBuses = async (req, res) => {
  const { startLocation, endLocation, startDate } = req.query;
  const sql = 'SELECT * FROM buses WHERE start_location = ? AND end_location = ? AND departure_time >= ?';
  const values = [startLocation, endLocation, startDate];

  try {
    const [rows] = await db.query(sql, values);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error searching buses:', error);
    res.status(500).json({ message: 'Failed to search buses' });
  }
};
>>>>>>> 1310a3f (CHANGES 12/08/2024)
