import Income from "../models/income.js";
import User from "../models/userModel.js";

export const monthlyIncomeMiddleware = async (req, res, next) => {
  try {
    const { userId } = req.body;

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get the current month and year
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Check if income has already been added for this month
    if (
      user.lastMonthlyIncomeMonth === currentMonth &&
      user.lastMonthlyIncomeYear === currentYear
    ) {
      return next(); // Skip processing if income already added for this month
    }

    // Find the user's monthly income
    const monthlyIncome = await Income.findOne({
      userId,
      frequency: 'monthly',
      $expr: {
        $and: [
          { $eq: [{ $month: '$date' }, currentMonth + 1] }, // MongoDB months are 0-indexed
          { $eq: [{ $year: '$date' }, currentYear] },
        ],
      },
    });

    // Process the monthly income
    if (monthlyIncome) {
      // Update the user's balance or perform other actions based on the income
      user.balance += monthlyIncome.amount;

      // Update the last income month and year
      user.lastMonthlyIncomeMonth = currentMonth;
      user.lastMonthlyIncomeYear = currentYear;

      // Save the updated user
      await user.save();

      console.log(`Monthly income processed for user ${userId}`);
    }

    next();
  } catch (error) {
    console.error('Error in monthlyIncomeMiddleware:', error);
    return res.status(500).json({ message: 'Error processing monthly income' });
  }
};
