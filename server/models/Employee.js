const mongoose = require('mongoose')

const PayrollSchema = new mongoose.Schema({
  date_paid: { type: Date },
  federal_tax_withheld: { type: Number, required: true },
  state_tax_withheld: { type: Number, required: true },
  social_security_tax: { type: Number, required: true },
  medicare_tax: { type: Number, required: true },
  amount_paid: { type: Number },
  bounce: { type: Number, default: 0 },
})

const EmployeeSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  address_1: {
    type: String,
    required: [true, 'Address Line 1 is required'],
  },
  address_2: {
    type: String,
  },
  city: {
    type: String,
    required: [true, 'City is required'],
  },
  state: {
    type: String,
    required: [true, 'State is required'],
  },
  zip: {
    type: String,
    required: [true, 'Zip code is required'],
  },
  ssn: { type: String, required: true },
  salary: { type: Number, required: true },
  withholdings: { type: Number, required: true },
  payroll: [PayrollSchema],
  created_at: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Employee', EmployeeSchema)
