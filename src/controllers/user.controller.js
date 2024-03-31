import { cookieOptions } from "../constants/constants.js";
import { loginService, userService } from "../services/users.service.js";
import { ApiError } from "../utils/apiError.utils.js";
import { ApiResponse } from "../utils/apiResponse.utils.js";
import { promiseHandler } from "../utils/asyncHandler.utils.js";

/**
 * Register new User (POST)
 */
// const registerUser = promiseHandler(async (req, res) => {
const registerUser = async (req, res) => {
  try {
    /**
     * Writing Api Steps
     * step-1 --> get user details from fronted --> done
     * step-2 --> Do some validation --> empty Check --> done
     * step-3 --> check if user already exists: username, email --> mongodb  --> done
     * step-4 --> Check for Avatar image --> done
     * step-5 --> upload image on cloudinary/aws and check the url --->
     * step-6 --> save all details on mongodb
     * step-7 --> remove password from response
     * step-8 --> send all response to user  with status code 201
     * step-9 --> config upload file middleware in router using multer
     */
    /**
     * After Testing Checking some point
     * step-1 --> password remove checking
     * step-2 --> file upload on cloudinary
     * step 3 --> check cloudinary url
     * step 4 --> check data is created or not on database
     */
    const { username, fullName, email, password } = req.body;

    //validation
    // if (!username || !fullName || !email || !password) return res.status(400).send({ msg: 'Please enter all fields' });
    // if (!username || !fullName || !email || !password){
    //       throw new ApiError(400, 'All fields are required');
    // }
    if (
      [username, fullName, email, password].some(
        (eachItem) => eachItem?.trim() === ""
      )
    ) {
      throw new ApiError(400, "Please enter all fields");
    }

    //Check Files
    const avatarLocalPath = req.files?.avatar[0]?.path;
    //validation
    if (!avatarLocalPath) {
      throw new ApiError(400, "Avatar file is missing!");
    }

    const response = await userService(
      username,
      fullName,
      email,
      password,
      avatarLocalPath
    );
    //send response
    res
      .status(201)
      .json(new ApiResponse(200, response, "User registered successfully!"));
  } catch (error) {
    console.log("Catch from controller Error :🙄😣", error);
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
const loginUser = async (req, res) => {
  /**
   * step-1 --> Get Data From Fronted/postman--> email/username, password
   * step-2 --> validation add
   * step-3 --> get the user according to over recived data --> username || email
   * step-4 --> check the password is correct or not --> isPasswordCorrect methord
   * step-5 --> set the error according to response  --> if password not match
   * step-6 --> access and refresh token generate and send in json format
   * step-6 --> remove the password from response
   * step-7 --> finaly send the response
   */
  try {
    const { username, email, password } = req.body;
    //validation check username or email
    if (!(username || email) && !password) {
      throw new ApiError(400, "username or email and password is required");
    }

    const { userData, accessToken, refreshToken } = await loginService(
      email,
      username,
      password
    );
    res
      .status(200)
      .cookie("accessToken", accessToken, cookieOptions)
      .cookie("refreshToken", refreshToken, cookieOptions)
      .json(
        new ApiResponse(
          200,
          {
            user: userData,
            accessToken,
            refreshToken,
          },
          "User logged In Successfully"
        )
      );
  } catch (error) {
    console.log("Error from login:", error);
  }
};

const logoutUser = async (req, res) => {
  /**
   * step-1 -->
   */
  try {
  } catch (error) {}
};

export { registerUser, loginUser };
