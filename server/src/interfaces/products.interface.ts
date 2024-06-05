import { Types } from "mongoose";
import { IUser } from "./user.interface";

export interface IProducts {
    _id: Types.ObjectId;
    name: string;
    price: number;
    quantity: number;
    description: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
    customer_id: IUser["_id"];
}