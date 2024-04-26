import User from "../models/userModel.js";

export const updateSettings = async (req, res) => {
    const {userId, minimumAmount } = req.body;
    console.log(userId, " and a mount of: ", minimumAmount)
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