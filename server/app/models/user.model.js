const { Schema, model } = require('mongoose');

const UserSchema = Schema(
  {
    username: {
      type: String,
      required: [true, 'username is required'],
      unique: true,
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
    room: { roomID: String, roomName: String },
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.toJSON = function () {
  const { __v, password, ...user } = this.toObject();
  return user;
};

module.exports = model('User', UserSchema);
