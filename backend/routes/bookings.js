const router = require('express').Router();
const Booking = require('../models/Booking');
const Flight = require('../models/Flight');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
  try {
    const { flightId, seats } = req.body;
    const flight = await Flight.findById(flightId);
    if (!flight) return res.status(404).json({ error: 'No flight' });
    if (flight.seatsAvailable < seats) return res.status(400).json({ error: 'Not enough seats' });
    flight.seatsAvailable -= seats;
    await flight.save();
    const totalPrice = seats * flight.price;
    const booking = await Booking.create({ user: req.user.id, flight: flight._id, seats, totalPrice });
    res.json(booking);
  } catch (e) { res.status(500).json({ error: 'Server' }); }
});

router.get('/', auth, async (req, res) => {
  const list = await Booking.find({ user: req.user.id }).populate('flight');
  res.json(list);
});

module.exports = router;
