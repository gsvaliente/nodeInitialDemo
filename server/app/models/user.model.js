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
      lowercase: true,
      unique: true,
      match: [/.+\@.+\..+/, 'not a valid email'],
    },
    password: {
      type: String,
      required: [true, 'password is required'],
      minlength: [6, 'Password should be at least 6 characters long'],
    },
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
