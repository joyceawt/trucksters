const mongoose = require('mongoose')

const VendorSchema = new mongoose.Schema({
  company_name: { type: String, required: true },
  part: { type: String, required: true },
  price_per_unit: { type: Number, required: true },
  address_1: { type: String, required: true },
  address_2: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
})

module.exports = mongoose.model('Vendor', VendorSchema)
