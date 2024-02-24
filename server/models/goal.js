const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const goalSchema = new Schema({
    user_id:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    target:{
        type:Number,
        required:true
    },
    current:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        default:'General',
        required:true
    },
    status:{
        type:String,
        required:true
    },
    deadline:{
        type:Date,
        required:true
    },
    startDate:{
        type:Date,
        default:Date.now
    },
}, {
    timestamps: true,

});


const User = mongoose.model('Goal', goalSchema);
module.exports = User;