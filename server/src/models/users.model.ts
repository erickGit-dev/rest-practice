import { Schema, model } from 'mongoose';
import IUsers from '../interfaces/users.interface';

const userSchema = new Schema<IUsers>({
  name: {
    type: String,
    required: [ true, 'Name is required' ],
    trim: true,
    minlength: [ 3, 'Name must be at least 3 characters long' ]
  },
  email: {
    type: String,
    required: [ true, 'Email is required' ],
    unique: true,
    lowercase: true,
    match: [ /\S+@\S+\.\S+/, 'Please use a valid email address' ]
  },
  password: {
    type: String,
    required: [ true, 'Password is required' ],
    minlength: [ 6, 'Password must be at least 6 characters long' ]
  },
  address: {
    street: { type: String, required: false },
    city: { type: String, required: false },
    state: { type: String, required: false },
    postalCode: { type: String, required: false }
  },
  phone: {
    type: String,
    required: [ true, 'Phone number is required' ],
    match: [ /^\+?\d{8,12}$/, 'Please use a valid phone number' ]
  },
  orders: [ {
    type: Schema.Types.ObjectId,
    ref: 'Order'
  } ],
  role: {
    type: String,
    enum: [ 'customer', 'admin' ],
    default: 'customer'
  }
}, {
  timestamps: true
});

const Users = model<IUsers>('User', userSchema);
export default Users;
