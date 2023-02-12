import { model, Schema } from 'mongoose';

const UserSchema = Schema({
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
    required: [true, 'field required'],
    minlength: 6,
  },
  online: {
    type: Boolean,
  },
});

UserSchema.methods.toJSON = function () {
  const { __v, password, ...user } = this.toObject();
  return user;
};

export default model('User', UserSchema);
