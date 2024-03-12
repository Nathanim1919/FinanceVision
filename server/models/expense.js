import mongoose from 'mongoose';
const { Schema } = mongoose;

const expenseSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
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
});

const Expense = mongoose.model('Expense', expenseSchema);
export default Expense;