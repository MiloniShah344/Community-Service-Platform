const mongoose = require('mongoose');

const ReceiptSchema = new mongoose.Schema({
userId: String,
  projectName: String,
  amount: Number,
  date: { type: Date, default: Date.now },
  city: String,
  startDate: String,
  status: String,
  description: String
});

module.exports = mongoose.model('Receipt', ReceiptSchema);
