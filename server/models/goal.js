const mongoose = require('mongoose');

const contributionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  frequency: { type: String, enum: ['Monthly', 'Quarterly', 'Yearly'], required: true }
});

const goalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  targetDate: { type: Date, required: true },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], required: true },
  contributions: { type: [contributionSchema], required: true },
  riskTolerance: { type: String, enum: ['Low', 'Moderate', 'High'], required: true, default:"Low" },
  trackingProgress: { type: Number, default:0 },
  notes: { type: String, required: true }
});

const Goal = mongoose.model('Goal', goalSchema);

module.exports = Goal;
