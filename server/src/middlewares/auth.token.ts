import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import User from '../models/user.model';
dotenv.config();

declare global {
    namespace Express {
      interface Request {
        user?: { username: string };
      }
    }
}

export const authToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.cookies.token as string;
    console.log(req.cookies);

    if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const key = process.env.PRIVATE_KEY || '';
        const decoded = jwt.verify(token, key) as { username: string };
        const user = await User.findOne({ name: decoded.username });
        req.user = decoded;

        if (user?.rol === 'admin') {
            next();
        } else {
            if (req.path === '/users' || req.path.startsWith('/updateUser/') || req.path.startsWith('/deleteUser/')) {
                res.status(403).json({ message: 'Forbidden' });
            }
            next();
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};