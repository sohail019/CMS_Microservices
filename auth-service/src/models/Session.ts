import mongoose, { Document, Schema } from "mongoose";

export interface ISession extends Document {
  userId: string;
  ip: string;
  userAgent: string;
  createdAt: Date;
  expiresAt: Date;
  isActive: boolean;
}

const SessionSchema = new Schema<ISession>({
  userId: { type: String, required: true },
  ip: String,
  userAgent: String,
  createdAt: { type: Date, default: Date.now },
  expiresAt: Date,
  isActive: { type: Boolean, default: true },
});

export const SessionModel = mongoose.model<ISession>("Session", SessionSchema);
