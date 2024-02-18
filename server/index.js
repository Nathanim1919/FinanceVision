import Express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import userRouter  from "./routes/authRoute.js";
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
    app.use(Express.json());
    app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
    const port = process.env.PORT || 3000;

    // Routes
    app.use("/api/v1/auth", userRouter);

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