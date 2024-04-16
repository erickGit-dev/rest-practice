import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "../models/user.model";
import { createConnection, closeConnection } from "../connection/database.connection";

dotenv.config();
createConnection();

const insertUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, secondName, email, password, rol } = req.body;
        const hashPassword: string = await bcrypt.hash(password, 8);
        const data = { name, secondName, email, password: hashPassword, rol }
        await User.db.collection("users").insertOne(data);
        res.status(200).send({ message: 'User added correctly' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Internal server error' });
    }
};

const showUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.db.collection("users").find({}).toArray()
        res.status(200).send(users);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal server error' });
    }
};

const authUsers = async (req: Request, res: Response): Promise<void> => {

    try {

    } catch (error) {
        console.error(error);
    }
}

const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const data = await User.db.collection(("users")).findOne({ id: req.params._id })

    } catch (error) {
        console.error(error)
    }
}

export { showUsers, insertUser, authUsers, updateUser };