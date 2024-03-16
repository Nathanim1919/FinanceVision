import mongoose, { Types } from "mongoose";
import { Schema } from "mongoose";


const ChatSchema = new Schema({
  user: {
    type:Types.ObjectId,
    ref:'User'
  },
  messages: [
    {
      type: Types.ObjectId,
      ref: "Message",
    },
  ],
});

const Chat =  mongoose.model('Chat', ChatSchema);
export default Chat;