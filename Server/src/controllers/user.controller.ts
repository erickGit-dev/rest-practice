import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "../models/user.model";
import { createConnection, closeConnection } from "../connection/database.connection";
import { IUser } from "../interfaces/user.interface";
dotenv.config();
createConnection();

const insertUser = async (req: Request, res: Response): Promise<void> => {
    const data: IUser = req.body;
    const hashPassword: string = await bcrypt.hash(data.password, 8);
    data.password = hashPassword;
    try {
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
    const data: IUser = req.body;
    const key = process.env.PRIVATE_KEY || '';
    const user = await User.findOne({ email: data.email });

    if (!user || !bcrypt.compareSync(data.password, user.password)) {
        res.status(401).json({ message: 'Incorrect credentials' });
    } else {
        const token = jwt.sign({ userId: user?._id, name: user?.name }, key, { expiresIn: '180s' });
        res.cookie('cookie', token, { httpOnly: true });
        res.json({ message: 'Login successfully' });
    }
}

const updateUser = async (req: Request, res: Response): Promise<void> => {
    const data: IUser = req.body;
    const hashPassword: string = await bcrypt.hash(data.password, 8);
    data.password = hashPassword;

    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.id },
            data,
            { new: true }
        );
        if (!user) {
            res.status(404).json({ message: 'Document not found' });
        }
        res.json({ message: 'Document updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findByIdAndDelete(
            req.params.id
        )
        if (!user) {
            res.status(404).json({ message: 'User dont found' });
        }
        res.status(200).json({ message: 'User deleted correctly' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export { insertUser, showUsers, authUsers, updateUser, deleteUser };