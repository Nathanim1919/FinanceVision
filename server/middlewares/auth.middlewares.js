import jwt from 'jsonwebtoken';
import User from "../models/userModel.js";
import { asyncHandler } from '../utils/asyncHandler.js';

export const verifyJWT = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization;

     // Check if the Authorization header exists and starts with 'Bearer '
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // Extract the token from the Authorization header
    const accessToken = authHeader.split(' ')[1];
  
    try {
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        req.user = await User.findById(decoded._id).populate('transactions').populate('goal');
        next();
    } catch (error) {
        res.status(401).json({
            message: "Unauthorized",
        });
    }
});