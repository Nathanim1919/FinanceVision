// index.js (your server code)
const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');

const {
        connectToDatabase,
        isConnected
    } = require('./config/connectDb');
const authRouter = require('./routes/authRouter');
const cors = require('cors');
    
const app = express();
dotenv.config();

// Middleware
app.use(express.json()); // Parse JSON requests

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));


// Initialize the app and connect to the database
// connectToDatabase()
//     .then(() => {
//         console.log('Connected to MongoDB');

//         // Check the connection status after it's established
//         if (isConnected()) {
//             console.log('Connection status: Connected');
//         } else {
//             console.log('Connection status: Error connecting');
//         }

//         // Start the server after the database connection is established
//         startServer();
//     })
//     .catch((error) => {
//         console.error('Error connecting to MongoDB:', error.message);
//     });

mongoose.connect('mongodb://127.0.0.1:27017/Assistanse', {})
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.log(error));


// Global error handling middleware
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).send('Something went wrong!');
// });



// Graceful shutdown on SIGTERM signal
// process.on('SIGTERM', () => {
    //     console.info('Received SIGTERM signal. Closing server gracefully.');
    //     // Add cleanup logic if needed
    //     process.exit(0);
// });


// API routes
app.use('/auth', authRouter);


// Unhandled Promise Rejections
// process.on('unhandledRejection', (reason, promise) => {
    //     console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    //     // Handle the error gracefully or log it
    //     process.exit(1); // Exit the process or handle as appropriate
    // });

    
// Start the server function
app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`));