import { Schema, model, Document } from 'mongoose';
import ICategory from '../interfaces/category.interface';

const categorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    trim: true,
    unique: true,
    minlength: [3, 'Category name must be at least 3 characters long']
  },
  description: {
    type: String,
    required: [true, 'Category description is required'],
    minlength: [8, 'Description must be at least 8 characters long']
  }
}, {
  timestamps: true
});

const Category = model<ICategory>('Category', categorySchema);
export default Category;
