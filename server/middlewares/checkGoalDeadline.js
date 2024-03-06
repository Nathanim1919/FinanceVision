import Goal from "../models/goal.js";
import Notification from "../models/notification.js";
import { io } from "../index.js";

export const checkGoalDeadlinesMiddleware = async (req, res, next) => {
  try {
    const { user, user: { _id: userId } } = req;

    // Find all goals for the user
    const goals = await Goal.find({ user_id:userId });

    // Calculate remaining days until the deadline for each goal
    const currentDate = new Date();

    goals.forEach(async (goal) => {
      const remainingDays = Math.ceil((new Date(goal.deadline) - currentDate) / (1000 * 60 * 60 * 24));

      if (remainingDays <= 5) {
        // Create and save the notification to the database
        const notification = new Notification({
          title: 'Goal Deadline Approaching!',
          message: `Your goal "${goal.title}" has a deadline approaching in ${remainingDays} days.`,
          type: `${remainingDays <= 5 && remainingDays >= 2?"info":"warning"}`,
          user: userId,
        });

        await notification.save();

        // Emit notification to the connected users
        io.emit('notification-created', notification);
      }
    });

    next();
  } catch (error) {
    console.error('Error in checkGoalDeadlinesMiddleware:', error);
    return res.status(500).json({ message: 'Error checking goal deadlines' });
  }
};
