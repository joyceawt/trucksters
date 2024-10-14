const mongoose = require('mongoose')

const InvoiceSchema = new mongoose.Schema({
  invoice_number: { type: Number, unique: true, required: true },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  quantity: { type: Number, required: true },
  price_per_unit: { type: Number, required: true },
  total_amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  due_date: { type: Date, required: true },
})

module.exports = mongoose.model('Invoice', InvoiceSchema)
