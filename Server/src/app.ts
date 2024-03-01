import user from "./routes/user.routes.js";
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 3008;

app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use("/api", user);

app.listen(port, () => {
    console.log(`Server listen on port ${port}`);
});