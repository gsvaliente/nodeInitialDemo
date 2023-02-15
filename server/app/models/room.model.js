const { Schema, model } = require('mongoose');

const RoomSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'field required'],
      trim: true,
      maxlength: 15,
    },
    messages: [
      {
        userData: { username: String, userID: String },
        roomData: { roomN: String, roomID: String },
        messageText: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model('Room', RoomSchema);
