const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { username, mobile, email, password } = req.body;
  const newUser = new User({ username, mobile, email, password });

  try {
    await newUser.save();
    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
