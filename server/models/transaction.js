import mongoose from "mongoose";
import { Schema } from "mongoose";


const transactionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    title:{
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    merchant: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ["deposit", "withdraw"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;