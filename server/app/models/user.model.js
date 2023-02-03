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
      default:
        'https://i.pinimg.com/originals/15/c1/ec/15c1ec0f3beb08c3587d65462fd0fc7a.jpg',
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
