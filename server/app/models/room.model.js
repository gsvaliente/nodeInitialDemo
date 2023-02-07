const { Schema, model } = require('mongoose');

const RoomSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'field required'],
    },
    messages: [
      {
        user: {
          username: String,
          userID: String,
        },
      },
      {
        room: {
          name: String,
          roomID: String,
        },
      },
    ],
    text: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Room', RoomSchema);
