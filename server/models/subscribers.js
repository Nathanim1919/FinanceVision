import mongoose from "mongoose";
import { Schema } from "mongoose";

const subscriberSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Subscriber = mongoose.model("Subscriber", subscriberSchema);
export default Subscriber;
