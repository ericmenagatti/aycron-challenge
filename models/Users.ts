import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  image: String,
  theme: String,
});

const UserModel = models.User || model('User', UserSchema);

export default UserModel;