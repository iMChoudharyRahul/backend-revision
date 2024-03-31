import {
  checkExistingUser,
  createdUser,
  removePassword,
} from "../dao/users.dao.js";
import { generateTokens } from "../helpers/user.helper.js";
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
const userService = async (
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

  const userData = await removePassword(userCreated._id);
  return userData;
};

/**
 * Login user Service
 * @param {*} email
 * @param {*} username
 * @param {*} password
 * @returns
 */
const loginService = async (email, username, password) => {
  //get the user according to over recived data
  const user = await checkExistingUser(email, username);
  if (!user) {
    throw new ApiError(
      404,
      "User Not found please Check your Email or Username"
    );
  }

  //check password  is correct or not
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid Password");
  }

  //Generate the access token and refresh token
  const { accessToken, refreshToken } = generateTokens(user._id);

  //Remove password before sending response
  const userData = await removePassword(user._id);
  return { userData, accessToken, refreshToken };
};

export { userService, loginService };
