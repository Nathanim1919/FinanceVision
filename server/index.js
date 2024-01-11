const express = require('express');
const dotenv = require('dotenv');
const {connectToDatabase, isConnected} = require("./config/connectDb");


// import routes
const authRouter = require('./routes/authRouter');
const incomeRouter = require('./routes/incomeRoute');
const messageRouter = require('./routes/messageRouter')


// use cross orgin resource
const cors = require('cors');



// create an express app
const app = express();

// configure .eve
dotenv.config();

// Middleware
app.use(express.json()); // Parse JSON requests


// give access permisson to spesific url
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// Connect to the database using the connectToDatabase function
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

// Function to start the server
function startServer() {
    app.use('/api/auth', authRouter);
    app.use('/api/income', incomeRouter)
    app.use('/api/messages', messageRouter)

    // Start the server
    app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`));
}

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Graceful shutdown on SIGTERM signal
process.on('SIGTERM', () => {
    console.info('Received SIGTERM signal. Closing server gracefully.');
    // Add cleanup logic if needed
    process.exit(0);
});