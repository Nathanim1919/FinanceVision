/**
 * @file User model for the FinanceVision server.
 * @module User
 */

import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { Schema } from "mongoose";

/**
 * User schema for the User model.
 * @typedef {Object} UserSchema
 * @property {string} username - The username of the user.
 * @property {string} email - The email of the user.
 * @property {string} password - The password of the user.
 * @property {string} confirmPassword - The confirmed password of the user.
 * @property {boolean} isEmailVerified - Indicates if the user's email is verified.
 * @property {string} emailVerificationToken - The token for email verification.
 * @property {Date} emailVerificationTokenExpires - The expiration date of the email verification token.
 * @property {string} passwordResetToken - The token for password reset.
 * @property {Date} passwordResetTokenExpires - The expiration date of the password reset token.
 * @property {Date} forgotPasswordExpiry - The expiration date for the forgot password process.
 * @property {string} refreshToken - The refresh token for authentication.
 * @property {string} forgotPasswordToken - The token for the forgot password process.
 * @property {Array.<ObjectId>} income - The income records associated with the user.
 * @property {Array.<ObjectId>} expense - The expense records associated with the user.
 * @property {Array.<ObjectId>} goal - The goal records associated with the user.
 * @property {Array.<ObjectId>} transactions - The transaction records associated with the user.
 * @property {Date} createdAt - The creation date of the user.
 * @property {Date} updatedAt - The last update date of the user.
 */

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    password: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    lastMonthlyIncomeMonth: {
      type: Number,
      required: true,
      default: new Date().getMonth(), 
    },
    
    lastMonthlyIncomeYear: {
      type: Number,
      required: true,
      default: new Date().getFullYear(), 
    },
    
    lastMonthlyDeductionMonth: {
      type: Number,
      required: true,
      default: new Date().getMonth(), 
    },
    
    lastMonthlyDeductionYear: {
      type: Number,
      required: true,
      default: new Date().getFullYear(), 
    },

    minimumAmount: {
      type: Number,
      default: 1000,
    },
    
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: {
      type: String,
    },
    emailVerificationTokenExpires: {
      type: Date,
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetTokenExpires: {
      type: Date,
    },
    forgotPasswordExpiry: {
      type: Date,
    },
    refreshToken: {
      type: String,
    },
    forgotPasswordToken: {
      type: String,
    },
    
    currency:{
      type: String,
      default: "ETB",
      enum: ["ETB","USD"]
    },
    deposit: {
      type: Number,
      default: 0,
    },
    incomes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Income",
      },
    ],
    expense: [
      {
        type: Schema.Types.ObjectId,
        ref: "Expense",
      },
    ],
    goal: [
      {
        type: Schema.Types.ObjectId,
        ref: "Goal",
      },
    ],
   
    transactions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Transaction",
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);




/**
 * Pre-save middleware function to hash the user's password before saving.
 * @function
 * @name userSchema.pre
 * @param {function} next - The next middleware function.
 */
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    next();
  }
});

/**
 * Compare the entered password with the user's hashed password.
 * @function
 * @name userSchema.methods.comparePassword
 * @param {string} enteredPassword - The entered password to compare.
 * @returns {Promise<boolean>} - A promise that resolves to true if the passwords match, otherwise false.
 */
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};




/**
 * Generate an access token for the user.
 * @function
 * @name userSchema.methods.generateAccessToken
 * @returns {string} - The generated access token.
 */
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};




/**
 * Generate a refresh token for the user.
 * @function
 * @name userSchema.methods.generateRefreshToken
 * @returns {string} - The generated refresh token.
 */
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};



/**
 * Generate a temporary token for the user.
 * @function
 * @name userSchema.methods.generateTemporaryToken
 * @returns {Object} - The generated temporary token.
 */

userSchema.methods.generateTemporaryToken = function () {
  /* 
     - This token will be used for email verification and password reset
     - It will be hashed and stored in the database
     - the unhashed token will be sent to the user's email
     - The token will expire after a certain period of time
     - The token will be hashed and stored in the database
     - then at the time of verification, the token will be hashed and compared with the token in the database
     - If the tokens match, the user will be verified
     - If the tokens do not match, the user will not be verified
     - The same process will be used for password reset and email verification
  */

  const unHashedToken = crypto.randomBytes(20).toString("hex");

  /*
    - The token will be hashed using the sha256 algorithm
    - The hashed token will be stored in the database
    - The unhashed token will be sent to the user's email
  */

    let hashedToken = crypto
    .createHash("sha256")
    .update(unHashedToken)
    .digest("hex");

  // The token will expire after a certain period of time
  const tokenExpiry = Date.now() + process.env.USER_TEMPORARY_TOKEN_EXPIRY;

  // Return the unhashed token, hashed token, and token expiry
  return { unHashedToken, hashedToken, tokenExpiry };
};




/**
 * User model for the FinanceVision server.
 * @class User
 * @extends mongoose.Model
 */
const User = mongoose.model("User", userSchema);
export default User;