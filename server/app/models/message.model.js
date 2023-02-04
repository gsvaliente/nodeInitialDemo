const { Schema, model } = require('mongoose');

const MessageSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  userID: {
    type: String,
    required: true,
  },
  roomID: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

module.exports = model('Message', MessageSchema);
