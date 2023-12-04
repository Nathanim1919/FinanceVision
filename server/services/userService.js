// services/userService.js

const UserModel = require('../models/user.js')

const getUserById = async (userId) => {
    try {
        const user = await UserModel.findById(userId);

        return user;
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw error;
    }
};

module.exports = {
    getUserById,
};
