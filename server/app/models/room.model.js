const { Schema, model } = require('mongoose');

const RoomSchema = Schema(
  {
    roomName: {
      type: String,
      required: [true, 'room must have a name'],
    },
    messages: [
      {
        type: Schema.Types.ObjectID,
        ref: 'Message',
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model('Room', RoomSchema);
