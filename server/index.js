// index.js (your server code)
const express = require('express');
const app = express();
const {
    port
} = require('./config/config');
const {
    connectToDatabase,
    isConnected
} = require('./config/connectDb');

// Use the promise returned by connectToDatabase
connectToDatabase()
    .then(() => {
        console.log('Connected to MongoDB');

        // Check the connection status after it's established
        if (isConnected()) {
            console.log('Connection status: Connected');
        } else {
            console.log('Connection status: Error connecting');
        }
        // Start the server after the database connection is established
        app.listen(port, () => {
            console.log(`Listening at port ${port}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error.message);
});