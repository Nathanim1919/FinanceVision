const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const incomeSchema = new Schema({
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
    type: String,
    required: true
  },
  frequency: {
    type: String,
    enum: ['monthly', 'onetime', 'weekly', 'biweekly', 'custom'],
    default: 'onetime'
  }
});

const Income = mongoose.model('Income', incomeSchema);

module.exports = Income;
