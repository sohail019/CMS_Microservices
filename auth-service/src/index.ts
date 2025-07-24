import express from "express";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes";
import { errorHandler } from "./middleware/errorHandler";
import "./config";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/auth", userRoutes);
app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_URI!, { dbName: "cms_auth" })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB error", err);
    process.exit(1);
  });

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Auth service running on port ${PORT}`));
