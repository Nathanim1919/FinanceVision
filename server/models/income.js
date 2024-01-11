const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const incomeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    enum: [
      "One time",
      "Every Day",
      "Every week",
      "Every month",
      "Every Quarter",
      "Every 6 month",
      "Annually",
    ],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Income = mongoose.model("Income", incomeSchema);
module.exports = Income;