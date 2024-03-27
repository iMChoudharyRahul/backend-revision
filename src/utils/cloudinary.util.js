import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

/**
 * Configure cloudinary credentials
 *  */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    //check if the local file path is not available
    if (!localFilePath)
      return console.log("Please provide Local File Path(missing file)");

    //upload the file to cloudinary
    const fileUpload = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log("Check full Object from cloudinary:📁📂 ", fileUpload);
    console.log("(❁´◡`❁)Check url from cloudinary:📂 ", fileUpload.url);

    //Remove the locally saved file
    // fs.unlinkSync(localFilePath);

    return fileUpload;
  } catch (error) {
    //Remove the locally saved file in case of upload failure
    // fs.unlinkSync(localFilePath);
    return null;
  }
};

export { uploadOnCloudinary }