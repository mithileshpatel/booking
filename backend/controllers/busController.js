const db = require('../config/dbConfig');
const path = require('path');

// Add Bus
exports.addBus = async (req, res) => {
  const { busName, busNumber, busType, seatingCapacity, route, departureTime, arrivalTime } = req.body;
  const busImage = req.file ? req.file.filename : null;

  const sql = 'INSERT INTO buses (name, number, type, seating_capacity, route, departure_time, arrival_time, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [busName, busNumber, busType, seatingCapacity, route, departureTime, arrivalTime, busImage];

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
