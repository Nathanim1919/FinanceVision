// controllers/authController.js
const jwt = require('jsonwebtoken');
const {getUserById} = require('../services/userService.js')


const verifyToken = async (req, res) => {
    try {
        // Extract the token from the request body or headers
        const token = req.body.token || req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                error: 'Unauthorized: No token provided'
            });
        }

        // Verify the token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // Assuming the decodedToken contains user information or user ID
        const userId = decodedToken.user.id;

        // Fetch user details from the database
        const user = await getUserById(userId);
        
        if (!user) {
            return res.status(401).json({
                error: 'Unauthorized: Invalid user'
            });
        }

        // Token is valid, send user details back to the client
        res.status(200).json({
            user
        });
    } catch (error) {
        console.error('Error during token verification:', error);
        return res.status(401).json({
            error: 'Unauthorized: Invalid token'
        });
    }
};

module.exports = {
    verifyToken,
};