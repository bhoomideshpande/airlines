const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  flight: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight' },
  seats: Number,
  totalPrice: Number,
  status: { type: String, enum: ['booked','cancelled'], default: 'booked' },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Booking', bookingSchema);
