import { hash } from "bcrypt";
import isEmail from "validator/lib/isEmail";
import isStrongPassword from "validator/lib/isStrongPassword";
import { NextFunction, Request, Response } from "express";
import { config } from "../config";
import { signupUserWithPassword } from "../services/accessManagement";
import { generateAccessToken } from "../lib/helpers/generateAccessToken";
import { findUserWithEmail } from "../services/accessManagement/login.services";
import ValidationError from "../lib/errors/ValidationError";

export interface SignupProps {
  email: string;
  password: string;
  isTermsAndConditionsAccepted: boolean;
  username?: string;
}

interface SignupRequest extends Request {
  body: SignupProps;
}

export const signup = async (
  req: SignupRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, isTermsAndConditionsAccepted } = req.body;

    let { username } = req.body;

    if (
      !isTermsAndConditionsAccepted ||
      typeof isTermsAndConditionsAccepted !== "boolean"
    ) {
      throw new ValidationError("Terms and conditions must be accepted");
    }

    if (!isEmail(email)) {
      throw new ValidationError("Email is not valid");
    }

    if (!isStrongPassword(password)) {
      throw new ValidationError("Password is not valid");
    }

    if (!username || typeof username !== "string") {
      username = email.split("@")[0];
    }

    //Add validation for username to verify if it doesn't exist in the database
    const userinDb = await findUserWithEmail(email);

    if (userinDb) {
      throw new ValidationError("User already exists");
    }

    const hashedPassword = await hash(password, config.SALT_ROUNDS);

    const user = await signupUserWithPassword({
      email,
      password: hashedPassword,
      isTermsAndConditionsAccepted,
      username,
    });

    const accessToken = generateAccessToken({ id: user._id });

    res.status(200).json({
      accessToken,
      userInfo: {
        email: user.email,
        username: user.username ? user.username : user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};
