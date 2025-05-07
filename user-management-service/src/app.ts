import express from "express";
import { errorHandler } from "./middleware/errorHandler";
import userRoutes from "./routes/userRoutes";
import "./config";

const app = express();

app.use(express.json());
app.use("/api", userRoutes);
app.use(errorHandler);

export default app;
