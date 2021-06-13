const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  disc_id: String,
  admin: Boolean,
  created_at: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model('user', UserSchema);
