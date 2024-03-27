import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const userRouter = Router();

//M-01
// userRouter.route("/register").post(registerUser);

//M02==> 
userRouter.post("/register", upload.fields([
    {name: "avatar", maxCount: 1}, //Only one file per field
]), registerUser);

export default userRouter;