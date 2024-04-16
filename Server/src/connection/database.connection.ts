import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const uri: string | undefined = process.env.DATABASE_URI || '';
const createConnection = async () => {
    try {
        !uri ? console.log(`Connection string error`) :
            await mongoose.connect(uri);
        console.log(`Connection successfuly created`);
    } catch (error) {
        throw error
    }
}

const closeConnection = async () => {
    try {
        await mongoose.disconnect();
        console.log({ text: `Connection close successfuly`});
    } catch (error) {
        console.error(`something failed`, error);
    }
}
export { createConnection, closeConnection }  