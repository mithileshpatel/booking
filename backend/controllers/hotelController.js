const db = require('../config/dbConfig');
const path = require('path');

// Controller method to add a hotel
exports.addHotel = async (req, res) => {
  const { hotelName, hotelAddress, hotelCity, hotelState, hotelZip, hotelPhone, hotelEmail } = req.body;
  const hotelImage = req.file ? req.file.filename : null;

  const sql = 'INSERT INTO hotels (name, address, city, state, zip, phone, email, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [hotelName, hotelAddress, hotelCity, hotelState, hotelZip, hotelPhone, hotelEmail, hotelImage];

  try {
    const [result] = await db.query(sql, values);
    res.status(201).json({ message: 'Hotel added successfully', id: result.insertId });
  } catch (error) {
    console.error('Error adding hotel:', error);
    res.status(500).json({ message: 'Failed to add hotel' });
  }
};

// Controller method to get hotels
exports.getHotels = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM hotels');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching hotels:', error);
    res.status(500).json({ message: 'Failed to fetch hotels' });
  }
};
