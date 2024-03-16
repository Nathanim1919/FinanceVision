import Chat from "../models/chat.js";
import Message from "../models/message.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { io } from "../index.js";



export const getMessages = async (req, res) => {
    try {
        const { chatId } = req.query;
        console.log(chatId)

        const chat = await Chat.findById(chatId).populate('messages');

        res
        .status(200)
        .json(new ApiResponse(200, chat, "Chat fetched successfully"));
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}

export const createMessage = async (req, res) => {
    try {
        const { chatId, content } = req.body;

        const isChatExist = await Chat.findById(chatId);

        if (!isChatExist){
            res.status(404).json({
                message:"the chat does not exist"
            })
        }

        const newMessage = new Message({
            chat:chatId,
            sender:"user",
            content
        });

        const savedMessage = await newMessage.save();

        (isChatExist.messages).push(savedMessage._id);

        await isChatExist.save();

        res.status(200).json(savedMessage);
    } catch (error) {
        console.log(error.message)
    }
}


export const aiMessage = async (req, res) => {
    try {
        const { chatId, content } = req.body;

        const isChatExist = await Chat.findById(chatId);

        if (!isChatExist){
            res.status(404).json({
                message:"the chat does not exist"
            })
        }

        const newMessage = new Message({
            chat:chatId,
            sender:"ai",
            content
        });

        // Emit notification to the connected users
        io.emit("message-sent", newMessage);

        const savedMessage = await newMessage.save();

        (isChatExist.messages).push(savedMessage._id);

        await isChatExist.save();

        res.status(200).json(savedMessage);
    } catch (error) {
        console.log(error.message)
    }
}