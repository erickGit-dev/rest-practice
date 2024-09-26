import { Schema } from "mongoose";

export default interface IUsers extends Document {
  _id: Schema.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
  };
  phone: string;
  orders: Schema.Types.ObjectId[];
  role: 'customer' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}