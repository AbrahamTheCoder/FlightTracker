import { Types } from "mongoose";

export type UserInfoInToken = {
  id: Types.ObjectId;
  iat: number; // iat meaning "issued at".
};
