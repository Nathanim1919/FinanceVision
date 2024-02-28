import Expense from "../models/expense.js";
import { ApiResponse } from "../utils/ApiResponse.js"; 
import User from "../models/userModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";

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
//   console.log(expenseData)
  const newExpense = new Expense(expenseData);

  // add the new expense to users expenses array
  const user = await User.findById(userId);
        user.expense.push(newExpense._id);
        user.deposit -= newExpense.amount;
        await user.save();
  try {
    await newExpense.save();
    res.status(201).json(
        new ApiResponse(201, newExpense, "Expense created successfully")
    );
  } catch (error) {
    res.status(409).json({ message: error.message });
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