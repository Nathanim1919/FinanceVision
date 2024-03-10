import jwt from 'jsonwebtoken';
import User from "../models/userModel.js";
import { asyncHandler } from '../utils/asyncHandler.js';

export const verifyJWT = asyncHandler(async (req, res, next) => {
    console.log(req)
    const accessToken = req.cookies?.accessToken;
    console.log(accessToken)
    if (!accessToken) {
            res.status(401).json({
            message: "Unauthorized",
        });
        return;
    }
    
    try {
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        req.user = await User.findById(decoded._id);
        next();
    } catch (error) {
        res.status(401).json({
        message: "Unauthorized",
        });
    }
});