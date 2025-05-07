import { Request, Response, NextFunction } from "express";
import { loginSchema } from "../schemas/loginSchema";
import { AppError } from "../errors/AppError";

export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    loginSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof Error) {
      next(new AppError("Invalid request", 400));
    } else {
      next(new AppError("Unknown validation error", 400));
    }
  }
};
