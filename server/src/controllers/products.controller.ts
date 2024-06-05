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
closeConnection();
export { addProducts, getProducts }