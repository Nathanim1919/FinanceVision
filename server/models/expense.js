const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  merchant: {
    type: String
  },
  // Add more fields as needed for your application
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
