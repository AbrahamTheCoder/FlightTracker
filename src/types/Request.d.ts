import { UserInfoInToken } from "../middlewares/authentication";

export type UserInRequest = UserInfoInToken & {
  isVerified: boolean;
};

declare global {
  namespace Express {
    interface Request {
      user: UserInRequest;
    }
  }
}
