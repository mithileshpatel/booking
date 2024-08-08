const db = require('../config/dbConfig'); // Ensure the path is correct
const bcrypt = require('bcrypt');

// User Signup
exports.signup = async (req, res) => {
  const { username, mobile, email, password } = req.body;

  if (!username || !mobile || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Check if the email already exists
    const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
    const [existingUser] = await db.execute(checkEmailQuery, [email]);

    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'Email is already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (username, mobile, email, password) VALUES (?, ?, ?, ?)';

    const [result] = await db.execute(query, [username, mobile, email, hashedPassword]);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get Users
exports.getUsers = async (req, res) => {
  try {
    const query = 'SELECT id, username, mobile, email FROM users';
    const [rows] = await db.execute(query);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Database error: ' + error.message });
  }
};

// Delete Users
exports.deleteUsers = async (req, res) => {
  const { userIds } = req.body;

  if (!Array.isArray(userIds) || userIds.length === 0) {
    return res.status(400).json({ error: 'No user IDs provided' });
  }

  try {
    const query = 'DELETE FROM users WHERE id IN (?)';
    const [result] = await db.execute(query, [userIds]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'No users found to delete' });
    }

    res.status(200).json({ message: 'Users deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Database error: ' + error.message });
  }
};
