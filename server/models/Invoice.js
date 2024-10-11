const mongoose = require('mongoose')

const InvoiceItemSchema = new mongoose.Schema({
  item_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Inventory' },
  item_name: String,
  quantity: Number,
  price_per_item: Number,
})

const InvoiceSchema = new mongoose.Schema({
  customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  invoice_date: { type: Date, required: true },
  items: [InvoiceItemSchema],
  total_amount: { type: Number, required: true },
  created_at: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Invoice', InvoiceSchema)
