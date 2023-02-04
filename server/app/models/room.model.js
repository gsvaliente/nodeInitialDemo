const { Schema, model } = require('mongoose');

const RoomSchema = Schema(
  {
    roomName: {
      type: String,
      required: [true, 'room must have a name'],
    },
    messages: [
      { user: { username: String, userID: String } },
      { room: { roomName: String, roomID: String } },
    ],
    text: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model('Room', RoomSchema);
