import { NextFunction, Request, Response } from "express";
import { LeanDocument, Types } from "mongoose";
import isEmail from "validator/lib/isEmail";
import ValidationError from "../lib/errors/ValidationError";
import {
  generateAccessToken,
  TokenParams,
} from "../lib/helpers/generateAccessToken";
import { User } from "../models";
import {
  comparePasswords,
  findUserWithEmail,
} from "../services/accessManagement/login.services";

interface LoginRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

export const login = async (
  req: LoginRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!isEmail(email)) {
      throw new ValidationError("INVALID_CREDENTIALS");
    }

    const userDB = await findUserWithEmail(email);

    if (!userDB) {
      throw new ValidationError("USER NOT FOUND", 401);
    }

    if (!userDB.password || typeof password !== "string") {
      throw new ValidationError(
        `Incorrect value from request property: password`
      );
    }

    const isValid = await comparePasswords(password, userDB.password);

    if (!isValid) {
      throw new ValidationError("ErrorMessage.INVALID_CREDENTIALS", 401);
    }

    const { accessToken } = generateParentLoginTokens(userDB);

    res.status(200).json({
      accessToken,
      userInfo: {
        email: userDB.email,
        isEmailVerified: userDB.isEmailVerified,
        username: userDB.username ? userDB.username : userDB.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

export function generateParentLoginTokens(user: LeanDocument<User>) {
  const token: TokenParams = { id: user._id };

  const accessToken = generateAccessToken(token);

  //   const students: Array<Types.ObjectId> = parent.students;

  //   const studentAccessTokens: StudentAccessTokens = students.map((student) => {
  //     return generateAccessToken({ id: student, userType: UserTypes.STUDENT });
  //   });

  return {
    accessToken,
  };
}
