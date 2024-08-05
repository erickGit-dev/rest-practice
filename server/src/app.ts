import users from "./routes/user.routes";
import products from "./routes/products.routes";
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { closeConnection, createConnection } from "./connection/database.connection";
dotenv.config();
createConnection();

const app = express();
const port = process.env.PORT || 3008;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use("/api/v0/", users);
app.use("/api/v1/", products);

process.on('SIGINT', closeConnection);
process.on('SIGTERM', closeConnection);

app.listen(port, () => {
    console.log(`Server listen on port ${port}`);
});