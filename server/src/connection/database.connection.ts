import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const URI_DB: string | undefined = process.env.DATABASE_URI || '';
const createConnection = async () => {
    try {
        !URI_DB ? console.log(`Connection string error`) :
            await mongoose.connect(URI_DB), {
                useNewUrlParser: true,
                useUnifiedTopology: true
            };
        console.log({
            text: `Connection successfuly created`
        });
    } catch (error) {
        throw error
    }
}

const closeConnection = async () => {
    try {
        await mongoose.disconnect();
        console.log({
            text: `Connection successfuly closed`
        });
    } catch (error) {
        console.error(`Something failed`, error);
    }
}
export { createConnection, closeConnection } 