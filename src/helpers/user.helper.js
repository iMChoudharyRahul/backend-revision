import { findUserDetails } from "../dao/users.dao";
import { ApiError } from "../utils/apiError.utils";

/**
 * Generate Access Token and Refresh Token
 * @param {*} userId
 * @returns { accessToken, refreshToken }
 */
const generateTokens = async (userId) => {
  try {
    const user = await findUserDetails(userId);
    if (!user) throw new ApiError(401, "user not found");

    // Generate access token and refresh token
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    //save the refresh token on database
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access token"
    );
  }
};

export { generateTokens };
