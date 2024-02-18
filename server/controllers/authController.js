import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/userModel.js";
import { sendEmail } from "../utils/mailing.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import crypto from "crypto";

/**
 * Registers a new user.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the user is registered.
 */
export const registerUser = asyncHandler(async (req, res) => {
  // Destructure the request body
  const { email, username, password, confirmPassword } = req.body;

  // Check if the user already exists
  const userExists = await User.findOne({
    $or: [{ email }, { username }],
  });

  // If the user exists, throw an error
  if (userExists) {
    res.status(400).json({
      message: "The Email or Username is already registered!",
    });
  }

  // Create a new user
  const user = await User.create({
    email,
    username,
    password,
    isEmailVerified: false,
  });

  /**
   * unHashedToken: unHashed token is something we will send to the user's mail
   * hashedToken: we will keep record of hashedToken to validate the unHashedToken in verify email controller
   * tokenExpiry: Expiry to be checked before validating the incoming token
   */

  const { unHashedToken, hashedToken, tokenExpiry } =
    user.generateTemporaryToken();

  // Save the user to the database
  user.emailVerificationToken = hashedToken;
  user.emailVerificationTokenExpires = tokenExpiry;
  await user.save({ validateBeforeSave: false });

  // Send the unhashed token to the user's email
  const verificationURL = `http://localhost:5173/verify-email/${unHashedToken}`;

  // Send the email
  await sendEmail({
    email: user.email,
    subject: "Email Verification",
    text: `Please verify your email by clicking on the link below: ${verificationURL}`,
  });

  console.log("first - 11111111111111111111111111  ", hashedToken)  

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken -emailVerificationToken -emailVerificationTokenExpiry"
  );

  // If the user is not created, throw an error
  if (!createdUser) {
    res.status(500);
    throw new Error("Something went wrong while registering the user");
  }

  // the user is created, send the response
  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        { user: createdUser },
        "Users registered successfully and verification email has been sent on your email."
      )
    );
});

export const verifyEmail = asyncHandler(async (req, res) => {
  // Destructure the verification token from the request params
  const { unHashedToken } = req.params;

  // Check if the verification token is missing
  if (!unHashedToken) {
    res.status(400);
    throw new Error("Email verification token is missing");
  }

  // Hash the verification token
  let hashedToken = crypto
    .createHash("sha256")
    .update(unHashedToken)
    .digest("hex");

  console.log("first - 22222222222222222222222222  ", hashedToken)  

  // While registering the user, same time when we are sending the verification mail
  // we have saved a hashed value of the original email verification token in the db
  // We will try to find user with the hashed token generated by received token
  // If we find the user another check is if token expiry of that token is greater than current time if not that means it is expired
  const user = await User.findOne({
    emailVerificationToken: hashedToken,
    // emailVerificationTokenExpires: { $gt: Date.now() },
  });

  // If the user is not found, throw an error
  if (!user) {
    res.status(400);
    throw new Error("Invalid or expired email verification token");
  }

  // If we found the user that means the token is valid
  // Now we can remove the associated email token and expiry date as we no  longer need them
  user.emailVerificationToken = undefined;
  user.emailVerificationTokenExpires = undefined;
  // Tun the email verified flag to `true`
  user.isEmailVerified = true;
  await user.save({ validateBeforeSave: false });

  // Send the response
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { isEmailVerified: true },
        "Email verified successfully"
      )
    );
});
