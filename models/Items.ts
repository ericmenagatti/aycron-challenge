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

const InCartSchema = new Schema({
  userEmail: {
    type: String,
    required: false,
  },
})

const ItemSchema = new Schema({
  title: String,
  price: Number,
  image: String,
  createdDate: {
    type: Date,
    default: Date.now(),
  },
  lastUpdated: {
    type: Date,
    default: Date.now(),
  },
  inCart: [InCartSchema],
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

const ItemModel = models.Item || model('Item', ItemSchema);

export default ItemModel;