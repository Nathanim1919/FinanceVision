const User = require("../models/user");
const Income = require("../models/income");

const createIncome = async (req, res) => {
  try {
    const { source, amount, duration, user } = req.body;

    // Create a new income record
    const newIncome = await Income.create({
      user: user._id,
      source,
      amount,
      duration,
      date: new Date()  // Fixed the typo here, changed "data" to "date"
    });

    const activeUser = await User.findById(user._id);
    // Associate the income record with the user
    activeUser.incomes.push(newIncome._id);

    // Save the changes to the activeUser document
    await activeUser.save();

    // Send a success response
    res.status(201).json({ success: true, data: newIncome });
  } catch (error) {
    // Handle errors and send an error response
    console.error('Error creating income:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};



const getIncomes = async (req, res) => {
  try{
   
  } catch (error){

  }
}

module.exports = {
  createIncome
};
