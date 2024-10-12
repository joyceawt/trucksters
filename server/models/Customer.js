const mongoose = require('mongoose')

const CustomerSchema = new mongoose.Schema({
  company_name: { type: String, required: true },
  last_name: { type: String, required: true },
  first_name: { type: String, required: true },
  address_1: { type: String, required: true },
  address_2: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
})

module.exports = mongoose.model('Customer', CustomerSchema)
