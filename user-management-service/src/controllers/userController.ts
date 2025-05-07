import { Request, Response, NextFunction } from "express";
import { getUsersService } from "../services/userService";
import { AppError } from "../errors/AppError";

export const getUsersController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await getUsersService();
    res.json(users);
  } catch (error) {
    if (error instanceof AppError) {
      next(error);
    } else if (error instanceof Error) {
      next(new AppError(error.message, 500));
    } else {
      next(new AppError("Unknown error", 500));
    }
  }
};
