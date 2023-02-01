const { Schema, model } = require('mongoose');

const UserSchema = Schema(
  {
    username: {
      type: String,
      required: [true, 'username is required'],
    },
    email: {
      type: String,
      required: [true, 'email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'password is required'],
    },
    image: {
      type: String,
      default: '',
    },
    status: {
      type: Boolean,
      default: true,
    },
    messages: {
      default: {},
    },
  },
  { minimize: true }
);

module.exports = model('User', UserSchema);
