const mongoose = require('mongoose');

const WebPostSchema = new mongoose.Schema({
  message: String,
  author: Object,
  messageObject: Object,
  attachment: Object,
  approved: Boolean,
  created_at: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model('webpost', WebPostSchema);
