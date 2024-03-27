import { User } from "../models/user.model.js";

/**
 * CHeck  if the user is authenticated or not. If yes, then return true else false
 * @param {*} email 
 * @param {*} username 
 * @returns 
 */
const checkExistingUser = async (email, username) => {
  return await User.findOne({ $or: [{ email }, { username }] });
};

/**
 * Register User (Signup)
 * @param {*} param0
 * @returns
 */
const createdUser = async ({ username, fullName, email, password, avatar }) => {
  let newUser = await User.create({
    username: username.toLowerCase(),
    fullName,
    email,
    password,
    avatar,
  });

  // Fetch the user without the password field
  const createdUserData = await User.findById(newUser._id).select("-password");
  return createdUserData;
};

export { checkExistingUser, createdUser };
