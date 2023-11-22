const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const budgetSchema = new Schema({
    userId: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: String,
        required: true
    },
    limit: {
        type: Number,
        required: true
    },
});

const Budget = mongoose.model('Budget', budgetSchema);