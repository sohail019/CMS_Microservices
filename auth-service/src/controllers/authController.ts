import { Request, Response, NextFunction } from "express";
import { loginService } from "../services/authService";
import { AppError } from "../errors/AppError";

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;
    const token = await loginService(email, password);
    res.json({ token });
  } catch (error) {
    if (error instanceof AppError) {
      next(error);
    } else if (error instanceof Error) {
      next(new AppError(error.message, 401));
    } else {
      next(new AppError("Unknown error", 500));
    }
  }
};
