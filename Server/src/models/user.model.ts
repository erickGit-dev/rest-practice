import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: false
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
        require: false,
        inmutable: true,
    }
});

const User = mongoose.model("Users", schema);
export default User;