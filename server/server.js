import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import routes from "./routes/routes.js";

import { errorHandler, routeNotFound } from "./middlewares/errorMiddlewaves.js";
import { dbConnection } from "./utils/index.js";

dotenv.config();
dbConnection();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  return res.status(200).json({ message: "WELCOME backend" });
});

app.use("/api", routes);
app.use(routeNotFound);
app.use(errorHandler);

// Export for Vercel
export default app;
