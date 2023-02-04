const { Schema, model } = require('mongoose');

const RoomSchema = Schema(
  {
    roomName: {
      type: String,
      required: [true, 'Please provide a name'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Room', RoomSchema);
