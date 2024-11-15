import { Schema, Document } from 'mongoose';

export default interface IProducts extends Document {
  name: string;
  description: string;
  price: number;
  category: Schema.Types.ObjectId;
  brand: string;
  stock: number;
  images: string[];
  attributes: { 
    color?: string;
    weight?: string;
    dimensions?: string;
  };
  rating: number;
  reviews: {
    user: Schema.Types.ObjectId;
    comment: string;
    rating: number;
    date: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}
