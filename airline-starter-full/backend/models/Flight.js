const mongoose = require('mongoose');
const flightSchema = new mongoose.Schema({
  flightNumber: String,
  origin: String,
  destination: String,
  departureTime: Date,
  arrivalTime: Date,
  seatsTotal: Number,
  seatsAvailable: Number,
  price: Number
});
module.exports = mongoose.model('Flight', flightSchema);
