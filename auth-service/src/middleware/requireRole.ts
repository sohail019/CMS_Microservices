import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

export const requireRole =
  (roles: string[]) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const userRoles: string[] = req.user?.roles || [];
    if (!roles.some((role) => userRoles.includes(role))) {
      return next(new AppError("Forbidden", 403));
    }
    next();
  };
