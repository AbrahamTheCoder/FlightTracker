import { SignupProps } from "../../controllers/user.signup.controller";
import { UserModel } from "../../models";

export const signupUserWithPassword = async ({
  email,
  password,
  isTermsAndConditionsAccepted,
  username = "",
}: SignupProps) => {
  const newUser = new UserModel({
    email,
    password,
    isTermsAndConditionsAccepted,
  });

  if (username) {
    newUser.username = username;
  }

  await newUser.save();

  return newUser;
};
