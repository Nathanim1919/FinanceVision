import Express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import Notification from "./models/notification.js";
// Routes
import userRouter  from "./routes/authRoute.js";
import incomeRouter from "./routes/incomeRoute.js";
import expenseRouter from "./routes/expenseRoute.js";
import goalRouter from './routes/goalRoute.js';
import transactionRouter from './routes/transactionRoute.js'; 
import notificationRouter from './routes/notificationRoute.js';
import settingRoute from './routes/settingRoute.js';
import { verifyJWT } from "./middlewares/auth.middlewares.js";


dotenv.config();



export const io = new Server(5000, {
  cors: {
    origin: 'https://finance-vision.vercel.app',
    credentials: true,
  },
});



const startServer = async () => {
  try {
    // Connect to MongoDB
    mongoose
      .connect(process.env.MONGO_URL)
      .then(() => console.log("Connected to MongoDB"))
      .catch((err) => console.log("unable to connect to MongoDB", err));

    // Create Express Server
    const app = new Express();

    app.use(cookieParser());
    app.use(Express.json());
    // configure cors 
    app.use(cors({
      origin: 'http://localhost:5173',
      credentials: true,
    }));
    

    const port = process.env.PORT || 3000;
    
    // Routes
    app.use("/api/v1/auth", userRouter);
    app.use("/api/v1/incomes", incomeRouter);
    app.use("/api/v1/expenses", expenseRouter);
    app.use("/api/v1/goals", goalRouter);
    app.use("/api/v1/transactions", transactionRouter);
    app.use("/api/v1/notifications", notificationRouter);
    app.use("/api/v1/settings", settingRoute);


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