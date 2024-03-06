import User from "../models/userModel.js";
import Notification from "../models/notification.js";
import {io} from '../index.js';

// Check if the user's balance is below the minimum amount
let notificationCreated = false;
export const checkMinimumBalance = async (req, res, next) => {
    try {
        const user = req.user;
        // Check if the user's balance is below the minimum amount
        const minimumAmount = user.minimumAmount;
        const balance = user.deposit;

        if (balance < minimumAmount && !notificationCreated) {
            // Send a notification
            const notification = new Notification({
                title: "Account Balance Warning",
                message: `Your account balance is below the minimum amount.`,
                type: "warning",
                user: user._id,
              });

              console.log(notification)
        
              await notification.save();
    
              // Emit notification to the connected users
              io.emit("notification-created", notification);
                notificationCreated = true;
        }
        // Continue to the next middleware or route handler
        next();
    } catch (error) {
        console.error("Error checking minimum balance:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
