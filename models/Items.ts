import { Schema, model, models } from 'mongoose';

export interface IItem {
  title: string;
  price: string;
  image: string;
  createdDate: Date;
  lastUpdate: Date;
  inCart: {
    userEmail: string;
  }[];
  boughtBy: string;
  status: string;
}

const ItemSchema = new Schema({
  title: String,
  price: String,
  image: String,
  createdDate: {
    type: Date,
    default: Date.now(),
  },
  lastUpdated: {
    type: Date,
    default: Date.now(),
  },
  inCart: [{
    userEmail: String
  }],
  createdBy: {
    type: String,
    unique: true,
  },
  boughtBy: {
    type: String,
    unique: true,
  },
  status: {
    type: String,
    enum: ['active', 'paused', 'removed', 'sold'],
  },
});

const ItemModel = models.User || model('Item', ItemSchema);

export default ItemModel;