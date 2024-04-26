import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import Express from "express";
import http from "http";
import mongoose from "mongoose";
import { Server } from "socket.io";

// Routes
import userRouter from "./routes/authRoute.js";
import chatRouter from "./routes/chatRoute.js";
import expenseRouter from "./routes/expenseRoute.js";
import goalRouter from "./routes/goalRoute.js";
import incomeRouter from "./routes/incomeRoute.js";
import notificationRouter from "./routes/notificationRoute.js";
import settingRoute from "./routes/settingRoute.js";
import subscriptionRouter from "./routes/subscriptionRoute.js";
import transactionRouter from "./routes/transactionRoute.js";

dotenv.config();

// Create Express Server
const app = new Express();
const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "https://finance-vision.vercel.app",
    // origin: 'http://localhost:5173',
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("new-message", (newMessage) => {
    socket.emit("message-sent", newMessage);
  });
});

const startServer = async () => {
  try {
    // Connect to MongoDB
    mongoose
      .connect(process.env.MONGO_URL)
      .then(() => console.log("Connected to MongoDB"))
      .catch((err) => console.log("unable to connect to MongoDB", err));

    app.use(cookieParser());
    app.use(Express.json());
    // configure cors
    app.use(
      cors({
        origin: "https://finance-vision.vercel.app",
        // origin: 'http://localhost:5173',
        credentials: true,
      }),
    );

    const port = process.env.PORT || 3000;

    // Routes
    app.use("/api/v1/auth", userRouter);
    app.use("/api/v1/incomes", incomeRouter);
    app.use("/api/v1/expenses", expenseRouter);
    app.use("/api/v1/goals", goalRouter);
    app.use("/api/v1/transactions", transactionRouter);
    app.use("/api/v1/notifications", notificationRouter);
    app.use("/api/v1/settings", settingRoute);
    app.use("/api/v1/chat", chatRouter);
    app.use("/api/v1/subscription", subscriptionRouter);

    // Start Server
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

// Start Server
startServer();
