const { Schema, model } = require('mongoose');

const MessageSchema = Schema(
  {
    sender: {
      from: Schema.Types.ObjectID,
      ref: 'User',
    },
    content: {
      type: String,
      trim: true,
    },
    room: {
      type: Schema.Types.ObjectID,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Message', MessageSchema);
