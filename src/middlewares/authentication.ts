import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import ValidationError from "../lib/errors/ValidationError";
import { decodeTokenFromHeader } from "../services/accessManagement/auth.service";
import { findUserWithId } from "../services/accessManagement/login.services";

export type UserInfoInToken = {
  id: Types.ObjectId;
  iat: number; // iat meaning "issued at".
};

export const authUser = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const decodedUserInfo = decodeTokenFromHeader(req);

    if (!decodedUserInfo) {
      throw new ValidationError("NOT_VALID_TOKEN", 401);
    }

    const verifiedUser = await findUserWithId(decodedUserInfo.id);

    if (!verifiedUser) {
      throw new ValidationError("USER_NOT_FOUND", 401);
    }

    // const isPremiumCache = await RedisService.userGetStatus(
    //   decodedUserInfo.id,
    //   UserTypes.PARENT
    // );

    // const isPremium = isPremiumCache
    //   ? Boolean(isPremiumCache)
    //   : await ParentService.isPremium(decodedUserInfo.id);

    req.user = {
      id: decodedUserInfo.id,
      iat: decodedUserInfo.iat,
      isVerified: verifiedUser.isEmailVerified,
    };

    next();
  } catch (error) {
    next(error);
  }
};
