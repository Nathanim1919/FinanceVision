import Expense from "../models/expense.js";
import Notification from "../models/notification.js";
import {io} from "../index.js";

export const monthlyExpenseDeductionMiddleware = async (req, res, next) => {
  const { user, user: { _id: userId } } = req;
  if (!user) return res.status(404).json({ message: 'User not found' });

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  if (user.lastMonthlyDeductionMonth === currentMonth && user.lastMonthlyDeductionYear === currentYear) {
    return next();
  }

  const recurringExpenses = await Expense.find({ userId, frequency: 'monthly' });

  for (let expense of recurringExpenses) {
    const { date: { getMonth, getFullYear }, amount, _id } = expense;
    const expenseMonth = getMonth.call(expense.date);
    const expenseYear = getFullYear.call(expense.date);

    if (expenseMonth === currentMonth && expenseYear === currentYear && amount <= user.balance) {
      user.balance -= amount;

    // notify the user about the expense deduction
    const notification = new Notification({
      title: 'Monthly Expense Deduction',
      message: `Your monthly expense of ${amount} BIRR has been deducted for ${expense.category}. your new balance is ${user.deposit} BIRR.`,
      type: 'info',
      user: userId,
    });

    // Emit notification to the connected users
    io.emit('notification-created', notification);
    await notification.save();
    } else if (amount > user.balance) {
      console.log(`Insufficient funds for user ${userId} and expense ${_id}`);
    }
  }

  user.lastMonthlyDeductionMonth = currentMonth;
  user.lastMonthlyDeductionYear = currentYear;

  await user.save();

  console.log(`Monthly deduction completed for user ${userId}`);
  next();
};