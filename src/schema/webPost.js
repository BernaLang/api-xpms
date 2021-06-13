const mongoose = require('mongoose');

const WebPostSchema = new mongoose.Schema({
  message: String,
  author: Object,
  messageObject: Object,
  approved: Boolean,
});

module.exports = mongoose.model('webpost', WebPostSchema);
