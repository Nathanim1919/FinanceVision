import User from "../models/userModel.js";

export const updateSettings = async (req, res) => {
    const {userId, minimumAmount } = req.body;
    console.log(userId);
    const user = await User.findByIdAndUpdate(
        userId,
        {
            $set: {
                minimumAmount
            },
        },
        { new: true }
    );
};