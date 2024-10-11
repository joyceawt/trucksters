const mongoose = require('mongoose')

const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact_info: String,
  created_at: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Customer', CustomerSchema)
