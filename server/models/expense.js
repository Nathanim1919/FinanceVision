import mongoose from 'mongoose';
const { Schema } = mongoose;

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

  frequency: {
    type: String,
    enum: ['monthly', 'onetime', 'weekly', 'annually'],
    default: 'onetime'
  }
  // Add more fields as needed for your application
});

const Expense = mongoose.model('Expense', expenseSchema);
export default Expense;