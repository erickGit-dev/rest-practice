import { Schema } from "mongoose";

export default interface IOrder extends Document {
    user: Schema.Types.ObjectId;
    items: {
        product: Schema.Types.ObjectId;
        quantity: number;
        price: number;
    }[];
    shippingAddress: {
        street: string;
        city: string;
        state: string;
        postalCode: string;
    };
    paymentInfo: {
        method: string;
        status: 'pending' | 'paid' | 'failed';
    };
    status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
    total: number;
    createdAt: Date;
    updatedAt: Date;
}