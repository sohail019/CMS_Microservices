import { AppError } from "../errors/AppError";

export const loginService = async (
  email: string,
  password: string
): Promise<string> => {
  // Mock authentication logic
  if (email === "test@example.com" && password === "password") {
    return "mock-jwt-token";
  }
  throw new AppError("Invalid credentials", 401);
};
