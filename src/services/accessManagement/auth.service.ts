import { Request } from "express";
import { verify } from "jsonwebtoken";
import ValidationError from "../../lib/errors/ValidationError";
import { UserInfoInToken } from "../../middlewares/authentication";
import { config } from "../../config";

const { AUTH_SECRET } = config;

export const decodeTokenFromHeader = (req: Request) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) throw new ValidationError("AUTH_TOKEN_MISSING", 401);

  return decodeToken(token);
};

export const decodeToken = (token: string) => {
  if (!AUTH_SECRET) throw new Error("AUTH_SECRET_MISSING");

  return verify(token, AUTH_SECRET) as UserInfoInToken;
};
