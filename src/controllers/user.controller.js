import { userService } from "../services/users.service.js";
import { ApiError } from "../utils/apiError.utils.js";
import { ApiResponse } from "../utils/apiResponse.utils.js";
import { promiseHandler } from "../utils/asyncHandler.utils.js";


/**
 * Register new User (POST)
 */
const registerUser = promiseHandler(async (req, res) => {
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
     * step 5 -- 
     */
    console.log("Checking Req  Body.😎 : ", req.body);
    const { username, fullName, email, password } = req.body;

    //validation
    // if (!username || !fullName || !email || !password) return res.status(400).send({ msg: 'Please enter all fields' });
    // if (!username || !fullName || !email || !password){
    //       throw new ApiError(400, 'All fields are required');
    // }
    //by hitesh choudhary
    if([username, fullName, email, password].some(eachItem => eachItem?.trim() === "")){
        throw new ApiError(400, "Please enter all fields");
    }

    //Check Files
    // console.log("Checking  File Upload.📸 ", req.files);
    const avatarLocalPath = req.files?.avatar[0]?.path;
    //validation
    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is missing!");
    }

     const response = await userService(username, fullName, email, password, avatarLocalPath);     
     //send response
     res.status(201).json(new ApiResponse(200, response, "User registered successfully!"));
})

export { registerUser };