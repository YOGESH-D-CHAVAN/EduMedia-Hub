import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponce.js";
import ApiError from "../utils/apiError.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

/* ---------------------------------------------------
   ✅ Register a New User
--------------------------------------------------- */

  /* ---------------------------------------------------
     ✅ Register a New User
  --------------------------------------------------- */
export const registerUser = asyncHandler(async (req, res) => {
  const { username, email: rawEmail, password, role } = req.body;
  const email = rawEmail?.trim().toLowerCase();

  // Validate role
  if (!["student", "teacher", "alumni", "mentor"].includes(role)) {
    return res.status(400).json({
      success: false,
      message:
        "Invalid role. Please select one of the following: student, teacher, alumni, or mentor.",
    });
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, "An account with this email already exists. Please log in instead.");
  }

  // Create new user
  const newUser = await User.create({
    username,
    email,
    password,
    role,
  });

  return res.status(201).json(
    new ApiResponse(201, "🎉 Registration successful! Welcome aboard!", {
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    })
  );
});

/* ---------------------------------------------------
   ✅ Login User
--------------------------------------------------- */
export const loginUser = asyncHandler(async (req, res) => {
  const { email: rawEmail, password, role } = req.body;
  const email = rawEmail?.trim().toLowerCase();

  // Check required fields
  if (!email || !password) {
    throw new ApiError(400, "Please provide both email and password to continue.");
  }

  // Find user by email (ignore role provided by frontend)
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(
      404,
      "We couldn’t find an account with that email. Please check your email or register."
    );
  }

  // Compare password
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new ApiError(401, "Incorrect password. Please try again.");
  }

  // Generate tokens
  const accessToken = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "15min" }
  );

  const refreshToken = jwt.sign(
    { userId: user._id },
    process.env.REFRESH_SECRET,
    { expiresIn: "7d" }
  );

  // Store refresh token in cookie (HTTP-only)
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  // Respond with tokens and user info
  return res.status(200).json(
    new ApiResponse(200, "✅ Logged in successfully!", {
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      accessToken,
    })
  );
});

/* ---------------------------------------------------
   ✅ Logout User
--------------------------------------------------- */
export const logoutUser = asyncHandler(async (req, res) => {
  // Clear refresh token cookie
  res.clearCookie("refreshToken", {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
});


  return res.status(200).json(
    new ApiResponse(200, "👋 You have been logged out successfully. See you soon!")
  );
});


export const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request: No refresh token");
  }

  try {
    const decoded = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_SECRET
    );
    const user = await User.findById(decoded.userId);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token: User not found");
    }

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    };

    const accessToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "15min" }
      );
    
      const newRefreshToken = jwt.sign(
        { userId: user._id },
        process.env.REFRESH_SECRET,
        { expiresIn: "7d" }
      );

    return res
      .status(200)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed"
        )
      );
  } catch (error) {
    console.error("Refresh Token Error:", error);
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});
