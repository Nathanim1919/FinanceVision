import Subscriber from "../models/subscribers.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const isValidEmail = (email) =>
  email && email.includes("@") && email.includes(".") && email.includes("com");

export const subscribe = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!isValidEmail(email))
    return res.json({
      message: "Email is invalid or not provided",
      status: "error",
    });

  const existingSubscriber = await Subscriber.findOne({ email });
  if (existingSubscriber)
    return res.json({ message: "Subscriber already exists", status: "error" });

  const subscriber = await Subscriber.create(req.body);
  res.json({
    data: subscriber,
    message: "Subscribed successfully",
    status: "success",
  });
});

export const getSubscribers = asyncHandler(async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.status(200).json({ data: subscribers });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
