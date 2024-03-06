import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const incomeSchema = new Schema({
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
    type: String,
    required: true
  },
  frequency: {
    type: String,
    enum: ['monthly', 'onetime', 'weekly', 'annually'],
    default: 'onetime'
  }
});

const Income = mongoose.model('Income', incomeSchema);
export default Income;