const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Missing' });
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ error: 'Email exists' });
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash: hash });
    res.json({ id: user._id });
  } catch (e) { res.status(500).json({ error: 'Server' }); }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const u = await User.findOne({ email });
    if (!u) return res.status(400).json({ error: 'Invalid' });
    const match = await bcrypt.compare(password, u.passwordHash);
    if (!match) return res.status(400).json({ error: 'Invalid' });
    const token = jwt.sign({ id: u._id, email: u.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (e) { res.status(500).json({ error: 'Server' }); }
});

module.exports = router;
