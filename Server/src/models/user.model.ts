import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    secondName: {
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
        inmutable: true,
    }
});

const User = mongoose.model("Users", schema);
export default User;