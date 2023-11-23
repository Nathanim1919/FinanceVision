// connectDb.js
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

const connectionString = process.env.MONGODB_URI;

// Return a promise to indicate the status of the connection
function connectToDatabase() {
    return mongoose.connect(connectionString);
}

module.exports = {
    connectToDatabase,
    isConnected: () => mongoose.connection.readyState === 1,
};