import { Document, Model, model, Schema, Types } from "mongoose";

type UserModelType = Model<User, Record<string, never>>;

export interface User extends Document {
  _id: Types.ObjectId;
  email: string;
  password?: string;
  phoneNumber?: string;
  username?: string;
  avatar?: string;
  isTermsAndConditionsAccepted: boolean;
  isEmailVerified: boolean;
  userFullName?: string;
}

const userSchema = new Schema<User, UserModelType>(
  {
    email: { type: String, required: true, index: { unique: true } },
    password: String,
    phoneNumber: String,
    username: String,
    avatar: String,
    isTermsAndConditionsAccepted: {
      type: Boolean,
      required: true,
      default: true,
    },
    isEmailVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    userFullName: String,
  },
  { timestamps: true }
);

export const UserModel = model<User>("User", userSchema);
