import jwt from 'jsonwebtoken';
import User from "../models/userModel.js";
import { asyncHandler } from '../utils/asyncHandler.js';

export const verifyJWT = asyncHandler(async (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    console.log(req.cookies);
    
  
    if (!accessToken) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

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