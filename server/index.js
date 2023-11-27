// index.js (your server code)
const express = require('express');
const {
    PORT
} = process.env;
const {
    connectToDatabase,
    isConnected
} = require('./config/connectDb');
const authRouter = require('./routes/authRouter');

const app = express();

// Middleware
app.use(express.json()); // Parse JSON requests

// Initialize the app and connect to the database
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
        startServer();
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error.message);
    });

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server function
function startServer() {
    app.listen(PORT || 3000, () => {
        console.log(`Server is running on port ${PORT || 3000}`);
    });
}

// Graceful shutdown on SIGTERM signal
process.on('SIGTERM', () => {
    console.info('Received SIGTERM signal. Closing server gracefully.');
    // Add cleanup logic if needed
    process.exit(0);
});

// API routes
app.use('/api', authRouter);

// Unhandled Promise Rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Handle the error gracefully or log it
    process.exit(1); // Exit the process or handle as appropriate
});
