import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const userRouter = Router();

//M-01
// userRouter.route("/register").post(registerUser);

//M02==>
userRouter.post(
  "/register",
  upload.fields([
    { name: "avatar", maxCount: 1 }, //Only one file per field
  ]),
  registerUser
);

userRouter.post("/login", loginUser)
export default userRouter;
