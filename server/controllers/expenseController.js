import Expense from "../models/expense.js";
import { ApiResponse } from "../utils/ApiResponse.js"; 
import User from "../models/userModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";
import Transaction from "../models/transaction.js";

// Get all expenses
const getExpenses = asyncHandler(async (req, res) => {
  const { userId } = req.query;
  try {
    const user = await User.findById(userId).populate("expense");
    res.status(200).json(
        new ApiResponse(200, user, "Expenses fetched successfully")
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new expense
const createExpense = asyncHandler(async (req, res) => {
  const {expenseData, userId} = req.body;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
      // Check if user exists
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }


      // Create new expense and transaction
      const newExpense = new Expense(expenseData);
      const transaction = new Transaction({
          user: userId,
          title: expenseData.category,
          amount: (expenseData.amount)*-1,
          merchant: expenseData.merchant,
          type: "withdraw",
          date: expenseData.date,
          frequency: expenseData.frequency,
      });

      // Push IDs to user's arrays and update deposit
      user.expense.push(newExpense._id);
      user.transactions.push(transaction._id);
      user.deposit -= newExpense.amount;

      // Save user and associated documents atomically
      await user.save({ session });
      await newExpense.save({ session });
      await transaction.save({ session });

      // Commit the transaction
      await session.commitTransaction();
      session.endSession();

      res.status(201).json(
          new ApiResponse(201, newExpense, "Expense created successfully")
      )
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
const updateIncome = asyncHandler(async (req, res) => {
  const { id: _id } = req.params;
  const income = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No income with that id");

  const updatedIncome = await Expense.findByIdAndUpdate(_id, income, { new: true });
  res.json(
      new ApiResponse(200, updatedIncome, "Income updated successfully")
  );
});

// Delete an existing income
const deleteExpense = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const {userId} = req.body;

    try {
      const currentUser = await User.findById(userId);
  
      // Remove the income ID from the current user's expenses array
      currentUser.expense = currentUser.expense.filter((expense) => expense != id);
  
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
  
export { getExpenses, createExpense, updateIncome, deleteExpense };