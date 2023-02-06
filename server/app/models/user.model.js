const { Schema, model } = require('mongoose');

const UserSchema = Schema(
  {
    username: String,
    email: String,
    password: String,
    room: { roomID: String, roomName: String },
  },
  {
    timestamps: true,
  }
);

module.exports = model('User', UserSchema);
