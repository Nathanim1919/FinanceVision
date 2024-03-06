import Income from "../models/income.js";
import {io} from "../index.js";

export const monthlyIncomeMiddleware = async (req, res, next) => {
  const { user, user: { _id: userId } } = req;
  if (!user) return res.status(404).json({ message: 'User not found' });

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  if (user.lastMonthlyIncomeMonth === currentMonth && user.lastMonthlyIncomeYear === currentYear) {
    return next();
  }

  const monthlyIncome = await Income.findOne({
    user: userId,
    frequency: 'monthly',
    $expr: {
      $and: [
        { $eq: [{ $month: '$date' }, currentMonth + 1] },
        { $eq: [{ $year: '$date' }, currentYear] },
      ],
    },
  });

  if (monthlyIncome) {
    user.deposit += monthlyIncome.amount;
    user.lastMonthlyIncomeMonth = currentMonth;
    user.lastMonthlyIncomeYear = currentYear;

    // notify the user about the monthly income
    const notification = new Notification({
      title: 'Monthly Income Added',
      message: `Your monthly income of ${monthlyIncome.amount} BIRR from ${monthlyIncome.source} has been added to your 
                account. Your new balance is ${user.deposit + monthlyIncome.amount} BIRR.`,
      type: 'info',
      user: userId,
    });

    // Emit notification to the connected users
    io.emit('notification-created', notification);

    await notification.save();
    await user.save();
    console.log(`Monthly income processed for user ${userId}`);
  }
  next();
};