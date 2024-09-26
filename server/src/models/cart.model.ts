import { Schema, model, Document } from 'mongoose';
import ICart from '../interfaces/cart.interface';

const cartSchema = new Schema<ICart>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  },
  items: [{
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'Product is required']
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [1, 'Quantity must be at least 1']
    }
  }],
  total: {
    type: Number,
    required: [true, 'Total amount is required'],
    min: [0, 'Total must be a positive number']
  }
}, {
  timestamps: { createdAt: false, updatedAt: true } 
});

// Exportamos el modelo
const Cart = model<ICart>('Cart', cartSchema);
export default Cart;
