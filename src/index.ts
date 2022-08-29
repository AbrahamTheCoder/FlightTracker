import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import routersHandler from "./routes";
import { requestLogger } from "./middlewares/requestLogger";
import errorHandler from "./middlewares/errorHandler";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(requestLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", routersHandler);

app.use(errorHandler);
export default app;
