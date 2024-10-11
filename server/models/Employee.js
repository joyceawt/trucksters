const mongoose = require('mongoose')

const PayrollSchema = new mongoose.Schema({
  payroll_date: { type: Date, required: true },
  gross_salary: { type: Number, required: true },
  tax_withheld: { type: Number, required: true },
  net_salary: { type: Number, required: true },
})

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  salary: { type: Number, required: true },
  payroll: [PayrollSchema],
  created_at: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Employee', EmployeeSchema)
