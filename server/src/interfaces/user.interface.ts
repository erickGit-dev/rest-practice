import { Types } from "mongoose"

export interface IUser {
    _id: Types.ObjectId,
    name: string,
    lastName: string,
    email: string,
    password: string,
    rol: string
}