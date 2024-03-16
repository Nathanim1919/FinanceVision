import mongoose, { Types } from "mongoose";
import { Schema } from "mongoose";

const ConversationSchema = new Schema({
  chat: {
    type: Types.ObjectId,
    ref: "Chat",
  },
  title: {
    type: String,
    require: true,
  },
  messages: [
    {
      type: Types.ObjectId,
      ref: "Message",
    },
  ],
});

module.exports = mongoose.model("Conversation", ConversationSchema);
