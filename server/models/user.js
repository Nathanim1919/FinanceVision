const mongoose  =  require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    // Authentication-related fields
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    
    dateOfBirth: {
        type: Date
    },

    // Contact information
    phoneNumber: {
        type: String
    },
    address: {
        type: String
    },

    // Financial information
    income: {
        type: Number,
        default: 0
    }, // Total income
    savings: {
        type: Number,
        default: 0
    }, // Total savings
    creditScore: {
        type: Number
    },

    // Additional preferences
    currency: {
        type: String,
        default: 'Birr'
    }, // User's preferred currency

    // Timestamps
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;