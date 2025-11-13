const router = require('express').Router();
const Flight = require('../models/Flight');

// public: list flights
router.get('/', async (req, res) => {
  const { origin, destination } = req.query;
  const q = {};
  if (origin) q.origin = origin;
  if (destination) q.destination = destination;
  const list = await Flight.find(q).limit(50);
  res.json(list);
});

// admin create (for simplicity no auth here; add auth+role check later)
router.post('/', async (req, res) => {
  const f = await Flight.create(req.body);
  res.json(f);
});

module.exports = router;
