import Income from "../models/income.js";
import { ApiResponse } from "../utils/ApiResponse.js"; 
import User from "../models/userModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";
import Transaction from "../models/transaction.js";

// Get all incomes
export const getIncomes = asyncHandler(async (req, res) => {
  const { userId } = req.query;
  try {
    const user = await User.findById(userId).populate("incomes").populate('transactions');
    res.status(200).json(
        new ApiResponse(200, user, "Incomes fetched successfully")
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new income
export const createIncome = asyncHandler(async (req, res) => {
  const { incomeData, userId } = req.body;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
      // Check if user exists
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      // Create new income and transaction
      const newIncome = new Income(incomeData);
            newIncome.user = userId;
      const transaction = new Transaction({
          user: userId,
          title: incomeData.category,
          amount: incomeData.amount,
          merchant: incomeData.merchant,
          type: "deposit",
          date: incomeData.date,
          frequency: incomeData.frequency,
      });
      // Push IDs to user's arrays and update deposit
      user.incomes.push(newIncome._id);
      user.transactions.push(transaction._id);
      user.deposit += newIncome.amount;

      // Save user and associated documents atomically
      await user.save({ session });
      await newIncome.save({ session });
      await transaction.save({ session });

      // Commit the transaction
      await session.commitTransaction();
      session.endSession();

      res.status(201).json(
          new ApiResponse(201, newIncome, "Income created successfully")
      );
  } catch (error) {
      // Explicitly log the full error for debugging
      console.error(error);

      // Rollback the transaction if an error occurs
      await session.abortTransaction();
      session.endSession();

      // Handle specific errors, if possible
      if (error.code === 11000) { // Duplicate key error (MongoDB code)
          res.status(409).json({ message: "Duplicate income data found." });
      } else {
          // Default error handling for other cases
          res.status(500).json({ message: "Internal server error" });
      }
  }
});



// Update an existing income
export const updateIncome = asyncHandler(async (req, res) => {
  const { id: _id } = req.params;
  const income = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No income with that id");

  const updatedIncome = await Income.findByIdAndUpdate(_id, income, { new: true });
  res.json(
      new ApiResponse(200, updatedIncome, "Income updated successfully")
  );
});

// Delete an existing income
export const deleteIncome = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const {userId} = req.body;

    try {
      const currentUser = await User.findById(userId);
  
      // Remove the income ID from the current user's incomes array
      currentUser.incomes = currentUser.incomes.filter((income) => income != id);
  
      // Save the updated user
      await currentUser.save();
  
      // Delete the income document
      await Income.findByIdAndDelete(id);
  
      res.json(
        new ApiResponse(200, {}, "Income deleted successfully")
      );
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
