import { Request, Response } from "express";
import dotenv from "dotenv";
import Products from "../models/products.model";
import IProducts from "../interfaces/products.interface";
import mongoose from "mongoose";
dotenv.config();

const addProducts = async (req: Request, res: Response): Promise<any> => {
    const data: IProducts = req.body;

    if (!data) { 
        return res.status(400).json({
            message: 'Please fill all the fields'
        });
    }

    try {
        await Products.create(data); 
        return res.status(200).json({
            message: 'Product added correctly'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal server error'
        });
    }
};

const getProducts = async (req: Request, res: Response): Promise<any> => {
    const products_id = req.params.id;

    try {
        if (products_id) {
            if (!mongoose.Types.ObjectId.isValid(products_id)) {
                return res.status(400).json({ 
                    message: 'Invalid _id format' 
                });
            }
            
            const product = await Products.findById(products_id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            return res.status(200).json(product);
        } else {
            const products = await Products.find({});
            return res.status(200).json(products);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal server error'
        });
    }
};

const updateProducts = async (req: Request, res: Response): Promise<void> => {
    const data: IProducts = req.body;
    try {
        if (!req.params.id) {
            res.status(400).json({
                message: 'Product not found'
            });
        };

        await Products.findByIdAndUpdate(
            { _id: req.params.id },
            data
        );
        res.status(200).json({
            message: 'Products update correctly'
        });

    } catch (error) {
        res.status(500).json({
            message: 'Internal server errot'
        });
    }
};

const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    const _id: string | null = req.params.id;
    try {
        if (!_id) {
            res.status(400).json({
                message: 'Product dont found'
            });
        }
        await Products.findByIdAndDelete(_id);
        res.status(200).json({
            message: 'Products deleted successfuly'
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
}

export { addProducts, getProducts, updateProducts, deleteProduct }; 
