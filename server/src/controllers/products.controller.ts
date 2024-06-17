import { Request, Response } from "express";
import dotenv from "dotenv";
import Products from "../models/products.model";
import { IProducts } from "../interfaces/products.interface";
import { closeConnection } from "../connection/database.connection";
dotenv.config();

const addProducts = async (req: Request, res: Response) => {
    const data: IProducts = req.body;
    if (!data) {
        res.status(400).send({
            error: 'Please fill all the fields'
        });
    }

    try {
        await Products.insertMany(data);
        res.status(200).send({
            message: 'Products added correctly'
        })
    } catch (error) {
        console.error(error);
        res.status(500).send({
            error: 'Internal server Error'
        })
    }
}

const getProducts = async (req: Request, res: Response) => {
    try {
        const products: unknown = await Products.find({});
        res.status(200).send(products);
    } catch (error) {
        console.error(error);
        res.status(500).send({
            error: 'Internal server error'
        })
    }
}

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