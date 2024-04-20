import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

declare global {
    namespace Express {
        interface Request {
            user?: { userId: string, name: string };
        }
    }
}

export const authToken = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.cookies.cookie;
    if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
    }

    const key = process.env.PRIVATE_KEY || '';
    try {
        const decoded = jwt.verify(token, key) as { userId: string, name: string };
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};