import { User } from "../models/user.model.js";

/**
 * CHeck  if the user is authenticated or not. If yes, then return true else false
 * @param {*} email
 * @param {*} username
 * @returns
 */
const checkExistingUser = async (email, username) => {
  const response = await User.findOne({ $or: [{ email }, { username }] });
  return response;
};

/**
 * Register User (Signup)
 * @param {*} param0
 * @returns
 */
const createdUser = async ({ username, fullName, email, password, avatar }) => {
  return await User.create({
    username: username.toLowerCase(),
    fullName,
    email,
    password,
    avatar,
  });
};

/**
 * Remove Password from Response while login/signup
 * @param {*} userId
 * @returns
 */
const removePassword = async (userId) => {
  return await User.findById(userId).select("-password");
};

/**
 * Find user details
 */
const findUserDetails = async (userId) => {
  return await User.findById(userId);
};
export { checkExistingUser, createdUser, removePassword, findUserDetails };
