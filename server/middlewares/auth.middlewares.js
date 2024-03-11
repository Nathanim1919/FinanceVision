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
    console.log('accessToken:', accessToken);

    // if (!accessToken) {
    //     res.status(401).json({
    //         message: "Unauthorized",
    //     });
    //     return;
    // }

    try {
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        console.log('decoded user:', decoded);
        req.user = await User.findById(decoded._id);
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(401).json({
            message: "Unauthorized",
        });
    }
});