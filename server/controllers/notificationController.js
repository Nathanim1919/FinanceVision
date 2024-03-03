import { io } from "../index.js"; // Import Socket.IO instance
import User from "../models/userModel.js";
import Income from "../models/income.js";
import Expense from "../models/expense.js";
import Goal from "../models/goal.js"; // Assuming you have a Goal model
import Transaction from "../models/transaction.js"; // Assuming you have a Transaction model
// import Bill from "../models/bill.js"; // Assuming you have a Bill model
import Notification from "../models/notification.js";


export const getNotifications = async (req, res) => {
  const { userId } = req.query;
  try {
    const notifications = await Notification.find({ user: userId });
    console.log(notifications);
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// const handleGoalProgressUpdate = async (goalId) => {
//   try {
//     const goal = await Goal.findById(goalId);

//     if (goal.progress === 100) {
//       const notification = new Notification({
//         title: "Saving Goal Reached!",
//         message: `Congratulations! You've reached your saving goal of ${goal.title}`,
//         type: "success",
//         user: goal.user,
//       });
//       await notification.save();
//       // Emit notification to the connected user
//       io.to(socket.id).emit("notification-created", notification);
//     }
//   } catch (error) {
//     console.error("Error handling goal progress update:", error);
//   }
// };

// const handleLowBalance = async (userId) => {
//   try {
//     const user = await User.findById(userId);
//     // Implement logic to check if user's balance is below a threshold (e.g., a minimum balance)
//     if (user.balance < threshold) {
//       const notification = new Notification({
//         title: "Low Balance Warning!",
//         message: `Your account balance is running low. Please consider adding funds`,
//         type: "warning",
//         user: userId,
//       });
//       await notification.save();

//       // Emit notification to the connected user
//       io.to(socket.id).emit("notification-created", notification);
//     }
//   } catch (error) {
//     console.error("Error handling low balance notification:", error);
//   }
// };

// const handleUpcomingBillDue = async (billId) => {
//   try {
//     const bill = await Bill.findById(billId);

//     if (isBillDueSoon(bill)) {
//       const notification = new Notification({
//         title: "Bill Due Soon!",
//         message: `A friendly reminder that your bill for ${bill.name} is due on ${bill.dueDate}`,
//         type: "warning",
//         user: bill.userId,
//       });
//       await notification.save();

//       // Emit notification to the connected user
//       io.to(socket.id).emit("notification-created", notification);
//     }
//   } catch (error) {
//     console.error("Error handling upcoming bill due notification:", error);
//   }
// };

// const handleRecurringSubscriptionReminder = async (
//   userId,
//   subscriptionData
// ) => {
//   try {
//     // Implement logic to check if a recurring subscription is upcoming based on its frequency and next payment date
//     if (isSubscriptionUpcoming(subscriptionData)) {
//       const notification = new Notification({
//         title: "Upcoming Subscription Payment!",
//         message: `A reminder that your ${subscriptionData.name} subscription payment is due on ${subscriptionData.nextPaymentDate}`,
//         type: "info",
//         user: userId,
//       });
//       await notification.save();

//       // Emit notification to the connected user
//       io.to(socket.id).emit("notification-created", notification);
//     }
//   } catch (error) {
//     console.error("Error handling recurring subscription reminder:", error);
//   }
// };

// const handleBillPaid = async (transactionId) => {
//   try {
//     const transaction = await Transaction.findById(transactionId);

//     if (transaction.category === "Bill Payment") {
//       const notification = new Notification({
//         title: "Bill Paid Successfully!",
//         message: `Your bill payment for ${transaction.description} has been processed successfully`,
//         type: "success",
//         user: transaction.userId,
//       });
//       await notification.save();

//       // Emit notification to the connected user
//       io.to(socket.id).emit("notification-created", notification);
//     }
//   } catch (error) {
//     console.error("Error handling bill paid notification:", error);
//   }
// };

// // Implement functions to check for bill due soon, upcoming subscription, etc.
// function isBillDueSoon(bill) {
//   const dueDate = new Date(bill.dueDate);
//   const today = new Date();
//   const daysToDueDate = Math.floor(
//     (dueDate.getTime() - today.getTime()) / (1000 * 3600 * 24)
//   );

//   // Consider a bill due soon if it's within 7 days or less
//   return daysToDueDate <= 7;
// }

// function isSubscriptionUpcoming(subscriptionData) {
//   const nextPaymentDate = new Date(subscriptionData.nextPaymentDate);
//   const today = new Date();
//   const daysToNextPayment = Math.floor(
//     (nextPaymentDate.getTime() - today.getTime()) / (1000 * 3600 * 24)
//   );

//   // Consider a subscription upcoming if it's within a certain timeframe (e.g., 3 days) before the next payment date
//   return daysToNextPayment <= 3;
// }
