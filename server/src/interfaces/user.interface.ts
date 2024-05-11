import { Types } from "mongoose"

interface IUser {
    _id: Types.ObjectId,
    name: string,
    secondName: string,
    email: string,
    password: string,
    rol: string
}   

export { IUser } 