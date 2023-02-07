const { Schema, model } = require('mongoose');

const UserSchema = Schema(
  {
    username: {
      type: String,
      required: [true, 'field required'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'field required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'file required'],
      minlength: 6,
    },
    room: {
      roomID: String,
      name: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('User', UserSchema);
