import express from "express";
import { errorHandler } from "./middleware/errorHandler";
import authRoutes from "./routes/authRoutes";
import "./config";

const app = express();

app.use(express.json());
app.use("/auth", authRoutes);
app.use(errorHandler);

export default app;
