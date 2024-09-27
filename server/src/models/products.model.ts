import { model, Schema } from "mongoose";
import IProducts from "../interfaces/products.interface";

const productSchema = new Schema<IProducts>({
    name: {
        type: String,
        required: [ true, 'Product name is required' ],
        trim: true,
        minlength: [ 3, 'Product name must be at least 3 characters long' ]
    },
    description: {
        type: String,
        required: [ true, 'Product description is required' ],
        minlength: [ 10, 'Description must be at least 10 characters long' ]
    },
    price: {
        type: Number,
        required: [ true, 'Price is required' ],
        min: [ 0, 'Price must be a positive number' ]
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: [ true, 'Category is required' ]
    },
    brand: {
        type: String,
        required: [ true, 'Brand is required' ]
    },
    stock: {
        type: Number,
        required: [ true, 'Stock is required' ],
        min: [ 0, 'Stock cannot be negative' ]
    },
    images: {
        type: [ String ],
        validate: {
            validator: (v: string[]) => v.length > 0,
            message: 'At least one image is required'
        }
    },
    attributes: {
        color: { type: String },
        weight: { type: String },
        dimensions: { type: String }
    },
    rating: {
        type: Number,
        default: 0,
        min: [ 0, 'Rating must be at least 0' ],
        max: [ 5, 'Rating cannot exceed 5' ]
    },
    reviews: [
        {
            user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
            comment: { type: String, required: true },
            rating: {
                type: Number,
                required: true,
                min: [ 1, 'Rating must be at least 1' ],
                max: [ 5, 'Rating cannot exceed 5' ]
            },
            date: { type: Date, default: Date.now }
        }
    ]
}, {
    timestamps: true
});

const Product = model<IProducts>('Product', productSchema);
export default Product;
