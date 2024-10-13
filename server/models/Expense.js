const mongoose = require('mongoose')

const Expense = new mongoose.Schema({
  amount: { type: Number, required: true },
  name: { type: String, required: true },
})

module.exports = mongoose.model('Expense', Expense)
