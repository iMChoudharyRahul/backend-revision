import { User } from "../models/user.model.js"

const checkExistingUser = async (email, username) => {
   return await User.findOne({ $or: [{ email }, { username }] });
}

/**
 * 
 * @param {*} param0 
 * @returns 
 */
const createdUser = async ({username, fullName, email, password, avatar}) => {
  return await User.create({
    username: username.toLowerCase(),
    fullName,
    email,
    password
  }).select("-password");
}

export { checkExistingUser, createdUser }