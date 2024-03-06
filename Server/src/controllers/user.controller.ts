import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.model";
import { createConnection, closeConnection } from "../connection/connection";
dotenv.config();

const payload = {
    usuarioId: 123456,
    nombreUsuario: 'Erick',
    rol: 'admin'
};

createConnection();
const privateKey: string = process.env.PRIVATE_KEY || '';
const getUser = (req: Request, res: Response): void => {
    if (!privateKey) {
        res.status(500).send({
            message: `Private key not found`
        });
        return;
    }

    const token = jwt.sign(payload, privateKey, { algorithm: 'HS256' });
    res.status(200).send({
        message: `token generate: ${token}`
    });
};

const insertUser = async (req: Request, res: Response) => {
    try {
        const data = await req.body;
        await User.db.collection("users").insertOne(data);
    } catch (error) {
        console.error(error);
    }
    res.status(200).send({ message: `user added correctly` });
    closeConnection();
};

export { getUser, insertUser }