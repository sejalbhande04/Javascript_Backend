import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.models.js";
import { upload } from "../middlewares/multer.middleware.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js"

const registerUser = asyncHandler(async (req, res) => {
  // Get user details from frontend
  // validate the user details
  // check if user already exists: username or email
  // check for images , check for avatar
  // upload avatar to cloudinary
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation success
  // return response with user details and token if success ELSE failure

  const { fullName, username, email, password } = req.body;

  // one way to do validate
  //  if(fullName === "" ||){
  //   throw new ApiError(400, "Full name is required");
  // }

  if (
    [fullName, username, email, password].some((field) => field.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = User.findOne({ $or: [{ username }, { email }] });

  if (existedUser) {
    throw new ApiError(409, "Username or email already exists");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;

  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required");
  }

  // upload avatar to cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(500, "Failed to upload avatar");
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    email,
    username: username.toLowerCase(),
    password,
    coverImage: coverImage?.url || ""
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  )

  if(!createdUser){
    throw new ApiError(500, "Somenthing went wrong while registering user!")
  }

  return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered successfully")
  )

});

export { registerUser };
