// controllers/userController.js
const db = require('../config/db'); // Check this path
const bcrypt = require('bcrypt');

// Your code here


exports.signup = async (req, res) => {
  const { username, mobile, email, password } = req.body;

  if (!username || !mobile || !email || !password) {
    return res.status(400).send({ error: 'All fields are required' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const query = 'INSERT INTO users (username, mobile, email, password) VALUES (?, ?, ?, ?)';
  db.query(query, [username, mobile, email, hashedPassword], (err, result) => {
    if (err) {
      return res.status(500).send({ error: 'Database error' });
    }
    res.status(201).send({ message: 'User registered successfully' });
  });
};
// controllers/userController.js
exports.getUsers = (req, res) => {
  const query = 'SELECT * FROM users';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send({ error: 'Database error' });
    }
    res.status(200).send(results);
  });
};
