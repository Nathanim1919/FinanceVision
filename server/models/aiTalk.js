const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AiTalkSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    messages: [{
        text: {
            type: String,
            required: true,
        },
        sender: {
            type: String,  // 'user' or 'ai'
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    }],
});

const AiTalk = mongoose.model('AiTalk', AiTalkSchema);
module.exports = AiTalk;
