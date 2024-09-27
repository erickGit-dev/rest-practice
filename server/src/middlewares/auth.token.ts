import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import User from '../models/user.model';
import { blacklist } from '../controllers/uses.controller';
dotenv.config();
declare global {
    namespace Express {
        interface Request {
            user?: { username: string };
        }
    }
}

export const authToken = async (req: Request, res: Response, next: NextFunction): Promise<unknown> => {
    const authHeaders = req.headers['authorization'];
    const token: string | undefined = authHeaders && authHeaders.split(' ')[1];
    console.log({ message: 'token received', token });

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    if (blacklist.has(token)) {
        return res.status(401).send('Token is blacklisted');
    }

    try {
        const key = process.env.PRIVATE_KEY || '';
        const decoded = jwt.verify(token, key) as { username: string }; 

        const user = await User.findOne({ name: decoded.username });
        req.user = decoded;

        if (user?.rol === 'admin') {
            return next();
        } else {
            if (req.path === '/users' || req.path.startsWith('/updateUser/') || req.path.startsWith('/deleteUser/')) {
                return res.status(403).json({ message: 'Forbidden' });
            }
            return next();
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};