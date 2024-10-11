const mongoose = require('mongoose')

const VendorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact_info: String,
  created_at: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Vendor', VendorSchema)
