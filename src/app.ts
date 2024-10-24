import express, { Application } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./docs/swagger/swagger.json";
import cors from "cors";
import router from "./routes";
import dotenv from "dotenv";
import morgan from "morgan";
dotenv.config();
const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/v1", router);

export default app;
