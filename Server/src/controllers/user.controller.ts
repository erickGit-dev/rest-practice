import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const payload = {
    usuarioId: 123456,
    nombreUsuario: 'ejemploUsuario',
    rol: 'admin'
};

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

export { getUser }