import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/authService";
import { TokenService } from "../services/TokenService";
import { AppError } from "../errors/AppError";

export class UserAuthController {
  static async signup(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = await AuthService.signup(req.body);
      res.status(201).json({
        message: "Signup successful. Please verify your email.",
        user,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { user, tokens } = await AuthService.login(req.body, req);
      res.cookie(
        "refreshToken",
        tokens.refreshToken,
        TokenService.getCookieOptions()
      );
      res.json({
        accessToken: tokens.accessToken,
        expiresIn: tokens.expiresIn,
        user,
      });
    } catch (error) {
      next(error);
    }
  }

  static async logout(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      await AuthService.logout(req.user, req.cookies.refreshToken);
      res.clearCookie("refreshToken");
      res.json({ message: "Logged out successfully." });
    } catch (error) {
      next(error);
    }
  }

  static async refresh(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const tokens = await AuthService.refresh(req.cookies.refreshToken);
      res.cookie(
        "refreshToken",
        tokens.refreshToken,
        TokenService.getCookieOptions()
      );
      res.json({
        accessToken: tokens.accessToken,
        expiresIn: tokens.expiresIn,
      });
    } catch (error) {
      next(error);
    }
  }

  static async forgotPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      await AuthService.forgotPassword(req.body.email);
      res.json({ message: "Password reset link sent." });
    } catch (error) {
      next(error);
    }
  }

  static async resetPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      await AuthService.resetPassword(req.body.token, req.body.newPassword);
      res.json({ message: "Password reset successful." });
    } catch (error) {
      next(error);
    }
  }

  static async verifyEmail(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      await AuthService.verifyEmail(req.body.token);
      res.json({ message: "Email verified successfully." });
    } catch (error) {
      next(error);
    }
  }
}
