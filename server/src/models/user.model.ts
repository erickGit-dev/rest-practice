import mongoose from "mongoose";
import { IUser } from "../interfaces/user.interface";
const schema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false 
    },
    email: {
        type: String,
        required: true,
        inmutable: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    rol: {
        type: String,
        require: false,
        inmutable: true,
    }
});

const User = mongoose.model("Users", schema);
export default User;