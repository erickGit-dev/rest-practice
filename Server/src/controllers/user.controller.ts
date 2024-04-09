import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.model";
import { createConnection, closeConnection } from "../connection/connection";
import { error } from "console";
dotenv.config();
createConnection();

const insertUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const data = req.body;
        await User.db.collection("users").insertOne(data);
        res.status(200).send({ message: 'User added correctly' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Internal server error' });
    }
};

const getUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.db.collection("users").find({}).toArray()
        res.status(200).send(users);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Internal server error' });
    }
};

export { getUser, insertUser };