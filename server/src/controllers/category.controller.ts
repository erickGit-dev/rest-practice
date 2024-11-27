import { Request, Response } from 'express';
import Category from '../models/category.model';
import mongoose from 'mongoose';

const getCategorys = async (req: Request, res: Response): Promise<any> => {
    const category_id = req.params.id;

    try {
        if (category_id) {
            if (!mongoose.Types.ObjectId.isValid(category_id)) {
                return res.status(400).json({
                    message: 'Invalid _id format'
                });
            }

            const product = await Category.findById(category_id);
            if (!product) {
                return res.status(404).json({ message: 'Category not found' });
            }
            return res.status(200).json(product);
        } else {
            const products = await Category.find({});
            return res.status(200).json(products);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal server error'
        });
    }
};

const createCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, description } = req.body;
        const newCategory = new Category({ name, description });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(400).json({ error: 'Error creating category', details: error });
    }
};

const updateCategory = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            { name, description },
            { new: true, runValidators: true }
        );
        if (!updatedCategory) {
            res.status(404).json({ error: 'Category not found' });
            return;
        }
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(400).json({ error: 'Error updating category', details: error });
    }
};

const deleteCategory = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const deletedCategory = await Category.findByIdAndDelete(id);
        if (!deletedCategory) {
            res.status(404).json({ error: 'Category not found' });
            return;
        }
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting category', details: error });
    }
};

export {
    getCategorys,
    createCategory,
    updateCategory,
    deleteCategory,
};
