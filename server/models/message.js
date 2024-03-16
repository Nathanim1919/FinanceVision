import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  chat: { 
    type: mongoose.Schema.Types.ObjectId, ref: "Chat" 
  },
  sender:{
    type:String,
    enum:["user", "ai"],
    require:true,
  },
  content: String,
});

const Message = mongoose.model("Message", MessageSchema);
export default Message;