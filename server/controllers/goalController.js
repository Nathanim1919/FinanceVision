import Goal from "../models/goal.js";
import User from '../models/userModel.js'
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


// Get all goals
export const getGoals = asyncHandler(async (req, res) => {
    const {userId} = req.query;
    try {
        const user = await User.findById(userId).populate("goal");
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
        const newGoal = await Goal.create(goalData);
        const user = await User.findById(userId);
        user.goal.push(newGoal._id);
        await user.save();

        res.status(201).json(
            new ApiResponse(201, newGoal, "Goal created successfully")
        );
    } catch (error) {
        if (error.code === 11000) {
            // Duplicate key error (MongoDB code for duplicate key)
            res.status(409).json({
                message: "Goal with the same data already exists.",
            });
        } else {
            // Other errors
            res.status(500).json({
                message: "Internal server error",
            });
        }
    }
});


