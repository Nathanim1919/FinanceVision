import Goal from "../models/goal.js";
import User from "../models/userModel.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Get all goals
export const getGoals = asyncHandler(async (req, res) => {
  const { userId } = req.query;
  try {
    const user = await User.findById(userId).populate("goal");
    res
      .status(200)
      .json(new ApiResponse(200, user, "Goals fetched successfully"));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const createGoal = asyncHandler(async (req, res) => {
  const { goalData, userId } = req.body;

  try {
    // Create a new goal
    const newGoal = await Goal.create(goalData);
    // Find the user and check if it exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Push the new goal ID to the user's goals array
    user.goal.push(newGoal._id);

    // Save the updated user document (explicitly return)
    const updatedUser = await user.save();

    res
      .status(201)
      .json(new ApiResponse(201, newGoal, "Goal created successfully"));
  } catch (error) {
    switch (error.code) {
      case 11000:
        // Duplicate key error
        res
          .status(409)
          .json({ message: "Goal with the same data already exists." });
        break;
      default:
        // Other errors (consider logging the full error for debugging)
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
  }
});


export const updateGoal = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, target, category, depositAmount } = req.body;

  try {
    // Find the goal by ID and update fields directly
    const updatedGoal = await Goal.findByIdAndUpdate(id, {
      $set: {
        title,
        description,
        target,
        category,
        current: { $inc: depositAmount }, // Use atomic increment
      },
      new: true, // Return the updated document
    });

    if (!updatedGoal) {
      // Handle goal not found
      return res.status(404).json({ message: 'Goal not found' });
    }

    const oldProgress = updatedGoal.progress

    // Calculate updated progress
    updatedGoal.progress = Math.floor((updatedGoal.current + depositAmount) / updatedGoal.target * 100);

    // Ensure progress stays within valid bounds (0-100%)
    updatedGoal.progress = Math.max(0, Math.min(100, updatedGoal.progress));

    // Save any potentially modified progress value (optional)
    if (updatedGoal.progress !== oldProgress) { // Check for changes
      await updatedGoal.save();
    }

    // Send successful update response
    res.json({ message: 'Goal updated successfully', data: updatedGoal });
  } catch (error) {
    // Handle errors
    console.error('Error updating goal:', error);
    res.status(500).json({ message: 'Error updating goal' });
  }
});

