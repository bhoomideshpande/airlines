const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  passwordHash: String,
  role: { type: String, enum: ['customer','admin'], default: 'customer' },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('User', userSchema);
