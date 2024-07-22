import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "../models/user.model";
import { IUser } from "../interfaces/user.interface";
dotenv.config();
const blacklist = new Set();


const insertUser = async (req: Request, res: Response): Promise<void> => {
    const data: IUser = req.body;
    try {
        const hashPassword: string = await bcrypt.hash(data.password, 8);
        data.password = hashPassword;
        const user = await User.findOne({ email: data.email })
        if (data.email == user?.email) {
            res.status(409).send({
                message: 'Email already exist'
            });
        } else {
            await User.insertMany(data);
            res.status(200).send({
                message: 'User added correctly'
            })
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({
            error: 'Internal server error'
        });
    }
};

const listUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const data: unknown = await User.find({})
        res.status(200).send(data);
    } catch (error) {
        console.error(error);
    }
};

const authUsers = async (req: Request, res: Response): Promise<void> => {
    const data: IUser = req.body;
    const key: string = process.env.PRIVATE_KEY || '';
    const user: IUser | null = await User.findOne({
        email: data.email
    });

    if (!user || !bcrypt.compareSync(data.password, user.password)) {
        res.status(401).json({
            message: 'Incorrect credentials'
        });
    } else {
        const token = jwt.sign({ name: user.name }, key);
        res.cookie('token', token, { httpOnly: true });
        res.json({
            message: 'Login successfully'
        });
    }
}

const updateUser = async (req: Request, res: Response): Promise<void> => {
    const data: IUser = req.body;
    const hashPassword: string = await bcrypt.hash(data.password, 8);
    data.password = hashPassword;

    try {
        const user: IUser | null = await User.findOneAndUpdate(
            { _id: req.params.id },
            data
        );
        if (!user) {
            res.status(404).json({
                message: 'Document not found'
            });
        }
        res.json({
            message: 'Document updated successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}

const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user: IUser | null = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            res.status(404).json({
                message: 'User dont found'
            });
        }
        res.status(200).json({
            message: 'User deleted correctly'
        });
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}
const logOut = (req: Request, res: Response) => {
    const token = req.cookies.token;
    if (token) {
        blacklist.add(token);
        res.status(200).send('Logged out');
    } else {
        res.status(401).send('No token provided');
    }
};

export { insertUser, listUsers, authUsers, updateUser, deleteUser, logOut, blacklist };