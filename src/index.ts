import "reflect-metadata";
import * as cors from "cors";
import * as express from "express";
import { createConnection } from "typeorm";
import * as dotenv from "dotenv";
import routes from "./routes";

dotenv.config();

const app = express();

createConnection();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(process.env.SV_PORT);