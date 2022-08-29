import { Types } from "mongoose";
import { UserModel } from "../../models";

export const findUserWithId = (id: Types.ObjectId) => {
  return UserModel.findById(id)
    .select("email isEmailVerified userFullName")
    .lean()
    .exec();
};

export const findUserWithEmail = (email?: string) => {
  return UserModel.findOne({ email }).select(
    "password email isEmailVerified username"
  );
};
