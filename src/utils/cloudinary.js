import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


// import { v2 as cloudinary } from "cloudinary";

// // Configuration
// cloudinary.config({
//   cloud_name: "dosjvtcwi",
//   api_key: "857115791998615",
//   api_secret: "<your_api_secret>", // Click 'View API Keys' above to copy your API secret
// });

// Upload an image
//  const uploadResult = await cloudinary.uploader
//    .upload(
//        'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
//            public_id: 'shoes',
//        }
//    )

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log("File uploaded successfully", response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the locally saved temporary file as upload operation failed
    return null;
  }
};


export {uploadOnCloudinary}