import Goal from "../models/goal.js";
import User from "../models/userModel.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Notification from "../models/notification.js";
import { io } from "../index.js";
// import io from '../index.js'

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
          newGoal.user_id = userId;
          await newGoal.save();

    // Create and save the notification
    const notification = new Notification({
      title: "New Goal Created!",
      message: `Happy running! You've created a new goal: ${newGoal.title}`,
      type: "info", // Replace with "success" if desired
      user: newGoal.user_id,
    });

    await notification.save();

    // Emit notification to the connected users
    io.emit("notification-created", notification);

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
  const { depositAmount } = req.body;

  try {
    let updatedGoal = await Goal.findById(id);

    if (!updatedGoal) {
      // Handle goal not found
      return res.status(404).json({ message: "Goal not found" });
    }

    if (
      depositAmount < 0 ||
      updatedGoal.current + depositAmount > updatedGoal.target ||
      depositAmount > updatedGoal.target ||
      updatedGoal.progress === 100
    ) {
      return res
        .status(400)
        .json({ message: "Deposit amount exceeds goal target" });
    }

    let notificationCreated = false;  // Move outside the try block

    updatedGoal.current += depositAmount;
    await updatedGoal.save();

    if (!updatedGoal) {
      return res.status(404).json({ message: "Goal not found" });
    }

    const oldProgress = updatedGoal.progress;

    // Calculate updated progress
    updatedGoal.progress = Math.floor(
      (updatedGoal.current / updatedGoal.target) * 100
    );

    // Ensure progress stays within valid bounds (0-100%)
    updatedGoal.progress = Math.max(0, Math.min(100, updatedGoal.progress));

    // Check if the goal progress is 100% and a notification has not been created
    if (updatedGoal.progress === 100 && !notificationCreated) {
      // Create and save the notification to the database
      const notification = new Notification({
        title: "Saving Goal Reached!",
        message: `Congratulations! You've reached your saving goal of ${updatedGoal.title}`,
        type: "success",
        user: updatedGoal.user_id,
      });

      await notification.save();
      notificationCreated = true; // Set the flag to true

      // Emit notification to the connected users
      io.emit("notification-created", notification);
    }

    if (updatedGoal.progress !== oldProgress) {
      // Check for changes
      await updatedGoal.save();
    }

    // Send successful update response
    res.json({ message: "Goal updated successfully", data: updatedGoal });
  } catch (error) {
    // Handle errors
    console.error("Error updating goal:", error);
    res.status(500).json({ message: "Error updating goal" });
  }
});

