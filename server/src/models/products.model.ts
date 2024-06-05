import mongoose from "mongoose";
import { IProducts } from "../interfaces/products.interface";

const schema = new mongoose.Schema<IProducts>({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        require: true
    },
    image: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: false
    },
    updatedAt: {
        type: Date,
        required: false
    },
    customer_id: {
        type: "ObjectId",
        required: false,
        unique: false
    }
});

const Products = mongoose.model("Products", schema);
export default Products