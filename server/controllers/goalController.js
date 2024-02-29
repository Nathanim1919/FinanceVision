import Goal from "../models/goal.js";
import User from '../models/userModel.js'
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


// Get all goals
export const getGoals = asyncHandler(async (req, res) => {
    const {userId} = req.query;
    console.log("hey guys how are you doing, i am doing well here! thanks for asking!")
    try {
        const user = await User.findById(userId).populate("goal");
        console.log("hey", user)
        res.status(200).json(
            new ApiResponse(200, user, "Goals fetched successfully")
        );
    } catch(error) {
        res.status(500).json({message:error.message})
    }
});

export const createGoal = asyncHandler(async (req, res) => {
    const { goalData, userId } = req.body;

    try {
        // Create a new goal
        const newGoal = await Goal.create(goalData);
         console.log(newGoal)
        // Find the user and check if it exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Push the new goal ID to the user's goals array
        user.goal.push(newGoal._id);

        // Save the updated user document (explicitly return)
        const updatedUser = await user.save();

        res.status(201).json(
            new ApiResponse(201, newGoal, "Goal created successfully")
        );
    } catch (error) {
        switch (error.code) {
            case 11000:
                // Duplicate key error
                res.status(409).json({ message: "Goal with the same data already exists." });
                break;
            default:
                // Other errors (consider logging the full error for debugging)
                console.error(error);
                res.status(500).json({ message: "Internal server error" });
        }
    }
});
 

