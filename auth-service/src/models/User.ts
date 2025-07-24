import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  email: string;
  mobile?: string;
  passwordHash: string;
  roles: string[];
  permissions: string[];
  isEmailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    mobile: { type: String },
    passwordHash: { type: String, required: true },
    roles: { type: [String], default: ["User"] },
    permissions: { type: [String], default: [] },
    isEmailVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model<IUser>("User", UserSchema);
