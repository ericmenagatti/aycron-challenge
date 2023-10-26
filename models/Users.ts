import { Schema, model, models } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  image: string;
  theme: string;
  role: string;
}

const UserSchema = new Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  image: String,
  theme: String,
  role: {
    type: String,
    enum: ['user', 'admin'],
  },
});

const UserModel = models.User || model('User', UserSchema);

export default UserModel;