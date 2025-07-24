import { Request, Response, NextFunction } from "express";
import { TokenService } from "../services/TokenService";
import { UserModel } from "../models/User";
import { AppError } from "../errors/AppError";

export const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError("Unauthorized", 401));
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = TokenService.verifyToken(token);
    const user = await UserModel.findById(payload.sub);
    if (!user) return next(new AppError("User not found", 401));
    req.user = user;
    next();
  } catch (err) {
    next(new AppError("Invalid token", 401));
  }
};
