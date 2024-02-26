import Income from "../models/income.js";
import { ApiResponse } from "../utils/ApiResponse.js"; 
import User from "../models/userModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Get all incomes
const getIncomes = asyncHandler(async (req, res) => {
  try {
    const incomes = await Income.find();
    res.status(200).json(
        new ApiResponse(200, incomes, "Incomes fetched successfully")
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new income
const createIncome = asyncHandler(async (req, res) => {
  const {incomeData, userId} = req.body;
//   console.log(incomeData)
  const newIncome = new Income(incomeData);

  // add the new income to users incomes array
  const user = await User.findById(userId);
        user.incomes.push(newIncome._id);
        await user.save();

  console.log(user)      

  try {
    await newIncome.save();
    res.status(201).json(
        new ApiResponse(201, newIncome, "Income created successfully")
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

  const updatedIncome = await Income.findByIdAndUpdate(_id, income, { new: true });
  res.json(
      new ApiResponse(200, updatedIncome, "Income updated successfully")
  );
});

// Delete an existing income
const deleteIncome = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No income with that id");

  await Income.findByIdAndRemove(id);
  res.json(
      new ApiResponse(200, {}, "Income deleted successfully")
  );
});

export { getIncomes, createIncome, updateIncome, deleteIncome };