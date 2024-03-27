import { checkExistingUser, createdUser } from "../dao/users.dao.js";
import { ApiError } from "../utils/apiError.utils.js";
import { uploadOnCloudinary } from "../utils/cloudinary.util.js";

/**
 * Register a new user to the database
 * @param {*} username
 * @param {*} fullName
 * @param {*} email
 * @param {*} password
 * @param {*} avatarLocalPath
 * @returns
 */
export const userService = async (
  username,
  fullName,
  email,
  password,
  avatarLocalPath
) => {
  //check if user already exists: username, email
  const existingUser = await checkExistingUser(email, username);

  if (existingUser) {
    throw new ApiError(
      409,
      "User Already registered. Please log in or use a different email/username"
    );
  }
  //upload image on cloudinary/aws and check the url
  const avatarRes = await uploadOnCloudinary(avatarLocalPath);

  //Check The Avatar Response
  if (!avatarRes) {
    throw new ApiError(500, "Server Error while uploading Image");
  }
  //upload all data on database
  let userCreated = await createdUser({
    username,
    fullName,
    email,
    password,
    avatar: avatarRes.secure_url,
  });
  
  if (!userCreated._id) {
    throw new ApiError(500, "Somthing went wrong creating your account");
  }

  return userCreated;
};
