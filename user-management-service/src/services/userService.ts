import { AppError } from "../errors/AppError";

export interface User {
  id: number;
  name: string;
  email: string;
}

export const getUsersService = async (): Promise<User[]> => {
  // Mock user data
  return [
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" },
  ];
  // Example error:
  // throw new AppError("Failed to fetch users", 500);
};
