import Transaction from "../models/transaction.js";
import User from "../models/userModel.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


// Get all transactions
export const getTransactions = asyncHandler(async (req, res) => {
    const { userId } = req.query;
    try {
        const user = await User.findById(userId).populate("transactions");
        console.log("hey", user)
        res.status(200).json(
            new ApiResponse(200, user, "Transactions fetched successfully")
        );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
