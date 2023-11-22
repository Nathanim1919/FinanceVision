const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const incomeSchema = new Schema({
    userId: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    source: {
        type: String,
        required: true
    },
    category: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
});

const Income = mongoose.model('Income', incomeSchema);
