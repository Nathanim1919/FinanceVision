import mongoose  from "mongoose";
import {Schema} from "mongoose";


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