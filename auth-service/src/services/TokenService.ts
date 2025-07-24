import jwt from "jsonwebtoken";
import {
  JWT_SECRET,
  JWT_ACCESS_EXPIRES_IN,
  JWT_REFRESH_EXPIRES_IN,
} from "../config";
import { IUser } from "../models/User";

export class TokenService {
  static generateTokens(user: IUser) {
    const payload = {
      sub: user._id,
      roles: user.roles,
      permissions: user.permissions,
    };
    const accessToken = jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_ACCESS_EXPIRES_IN,
    });
    const refreshToken = jwt.sign({ sub: user._id }, JWT_SECRET, {
      expiresIn: JWT_REFRESH_EXPIRES_IN,
    });
    return { accessToken, refreshToken, expiresIn: 15 * 60 }; // 15 min in seconds
  }

  static verifyToken(token: string): any {
    return jwt.verify(token, JWT_SECRET);
  }

  static getCookieOptions() {
    return {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };
  }
}
