import { Schema } from "mongoose";

export default interface ICart extends Document {
    user: Schema.Types.ObjectId;
    items: {
        product: Schema.Types.ObjectId;
        quantity: number;
    }[];
    total: number;
    updatedAt: Date;
}
