import Expense from "../models/expense.js";
import User from "../models/userModel.js";

export const monthlyExpenseDeductionMiddleware = async (req, res, next) => {
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
  
      // Check if deduction has already been performed for this month
      if (
        user.lastMonthlyDeductionMonth === currentMonth &&
        user.lastMonthlyDeductionYear === currentYear
      ) {
        return next(); // Skip deduction if already performed for this month
      }
  
      // Find all recurring expenses
      const recurringExpenses = await Expense.find({
        userId,
        frequency: 'monthly',
      });
  
      // Deduct the expenses from the user's balance
      recurringExpenses.forEach(async (expense) => {
        const expenseMonth = expense.date.getMonth();
        const expenseYear = expense.date.getFullYear();
  
        // Check if the expense is for the current month and year
        if (expenseMonth === currentMonth && expenseYear === currentYear) {
          if (expense.amount > user.balance) {
            // Handle insufficient funds
            console.log(`Insufficient funds for user ${userId} and expense ${expense._id}`);
            return;
          }
  
          // Deduct the expense amount from the user's balance
          user.balance -= expense.amount;
        }
      });
  
      // Update the last deduction month and year
      user.lastMonthlyDeductionMonth = currentMonth;
      user.lastMonthlyDeductionYear = currentYear;
  
      // Save the updated user
      await user.save();
  
      console.log(`Monthly deduction completed for user ${userId}`);
  
      next();
    } catch (error) {
      console.error('Error in monthlyExpenseDeductionMiddleware:', error);
      return res.status(500).json({ message: 'Error processing monthly expenses' });
    }
  };
