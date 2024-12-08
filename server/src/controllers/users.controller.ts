import { Request, Response } from "express";
import { responses } from "../utils/responses";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import IUsers from "../interfaces/users.interface";
import Users from "../models/users.model";

dotenv.config();
const blacklist = new Set();

const signUp = async (req: Request, res: Response): Promise<any> => {
    const data: IUsers = { ...req.body };

    try {
        if (data._id) {
            delete data._id;
        }

        const user = await Users.findOne({ email: data.email });
        if (user) {
            return res.status(409).send({
                message: responses.singUp.EMAIL_EXIST
            });
        }

        const hashPassword: string = await bcrypt.hash(data.password, 8);
        data.password = hashPassword;

        await Users.create(data);
        return res.status(201).send({
            message: responses.singUp.USER_ADDED_CORRECTLY
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            error: responses.serverError.INTERNAL_SERVER,
        });
    }
};

const logIn = async (req: Request, res: Response): Promise<any> => {
    const data: IUsers = req.body;
    const key: string = process.env.PRIVATE_KEY as string;

    if (!key) {
        console.error('PRIVATE_KEY is not set in environment variables.');
        return res.status(500).json({
            success: false,
            message: responses.serverError.INTERNAL_SERVER
        });
    }

    const user: IUsers | null = await Users.findOne({
        email: data.email
    });

    if (!user || !bcrypt.compare(data.password, user.password)) {
        return res.status(401).json({
            success: false,
            message: responses.logIn.INCORRECT_CREDENTIALS
        });
    } else {
        const token = jwt.sign({ name: user.name }, key, { algorithm: 'HS256', expiresIn: '1h' });
        console.log(token);
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none',
            maxAge: 3600000,
        });

        return res.json({
            success: true,
            message: responses.logIn.DONE_RESPONSE,
            token
        });
    }
}

const logOut = (req: Request, res: Response) => {
    try {
        const authHeader = req.headers[ 'authorization' ];
        const token = authHeader?.split(' ')[ 1 ];
        blacklist.add(token);
        res.clearCookie('token');
        res.status(200).send({
            message: responses.logOut.LOGOUT_SUCCESSFULLY
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: responses.serverError.INTERNAL_SERVER
        });
    }
};

const listUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const data: unknown = await Users.find({})
        res.status(200).send(data);
    } catch (error) {
        console.error(error);
    }
};

const updateUser = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({
            message: responses.deleteUser.INVALID_ID_FORMAT
        });
    }

    const data: Partial<IUsers> = req.body;
    if (data.password) {
        data.password = await bcrypt.hash(data.password, 8);
    }

    try {
        const user: IUsers | null = await Users.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        );

        if (!user) {
            return res.status(404).json({
                message: responses.updateUser.DOCUMENT_DONT_FOUND
            });
        }

        res.json({
            message: responses.updateUser.USER_UPDATED_CORRECTLY,
            user
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: responses.serverError.INTERNAL_SERVER
        });
    }
};

const deleteUser = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({
            message: responses.deleteUser.INVALID_ID_FORMAT
        });
    }

    try {
        const user: IUsers | null = await Users.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({
                message: responses.deleteUser.USER_NOT_FOUND
            });
        }

        res.status(200).json({
            message: responses.deleteUser.USER_DELETE_SUCCESSFULY
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: responses.serverError.INTERNAL_SERVER
        });
    }
};

export { signUp, logIn, logOut, listUsers, updateUser, deleteUser, blacklist };