const mongoose  =  require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    // Authentication-related fields
    username: {
        type: String,
        unique: true,
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

    // Personal information
    firstName: {
        type: String
    },
    lastName: {
        type: String
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
        default: 'USD'
    }, // User's preferred currency
    theme: {
        type: String,
        default: 'light'
    }, // User interface theme preference

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
