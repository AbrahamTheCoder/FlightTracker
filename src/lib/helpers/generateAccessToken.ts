import { sign } from "jsonwebtoken";

import { config } from "../../config";
import { UserInfoInToken } from "../../middlewares/authentication";

export type TokenParams = Pick<UserInfoInToken, "id">;

export const generateAccessToken = (accessToken: TokenParams) => {
  if (!config.AUTH_SECRET) throw new Error("AUTH_SECRET is not set");

  return sign(accessToken, config.AUTH_SECRET);
};
