import Express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import http from 'http'
// Routes
import userRouter  from "./routes/authRoute.js";
import incomeRouter from "./routes/incomeRoute.js";
import expenseRouter from "./routes/expenseRoute.js";
import goalRouter from './routes/goalRoute.js';
import transactionRouter from './routes/transactionRoute.js'; 
import Goal from "./models/goal.js";

dotenv.config();

const startServer = async () => {
  try {
    // Connect to MongoDB
    mongoose
      .connect(process.env.MONGO_URL)
      .then(() => console.log("Connected to MongoDB"))
      .catch((err) => console.log("unable to connect to MongoDB", err));

    // Create Express Server
    const app = new Express();
    const server = http.createServer(app);
    const io = new Server(server, {
      cors: {
        origin: 'http://localhost:5173',
        credentials: true,
      }
    });


    // Socket io event listner
    io.on('connection', (socket) => {
      console.log("Connected");

      socket.on('goal-progress-update', async (goalId) => {
        try {
          const goal = await Goal.findById(goalId);
            if (goal.process === 100){
                const notification = new Notification({
                  title:"Goal Achieved!",
                  message:`Congratulations! You've reached your goal of ${goal.title}`,
                  type:'success',
                  user: goal.user,
                })
                await notification.save();


                // Emiit notification to the connected user
                io.to(socket.id).emit('notification-created', notification);
            }
          
        } catch (error) {
          console.error('Error handling goal progress update:', error)
        }
      });
    });


    app.use(cookieParser());
    app.use(Express.json());
    app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
    const port = process.env.PORT || 3000;

    
    // Routes
    app.use("/api/v1/auth", userRouter);
    app.use("/api/v1/incomes", incomeRouter);
    app.use("/api/v1/expenses", expenseRouter);
    app.use("/api/v1/goals", goalRouter);
    app.use("/api/v1/transactions", transactionRouter);


    // Start Server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

  } catch (error) {
    console.log(error);
  }
};

// Start Server
startServer();