const mongoose = require('mongoose')

const PurchaseOrderSchema = new mongoose.Schema({
  po_number: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor',
    required: true,
  },
  part: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Inventory',
    required: true,
  },
  quantity: { type: Number, required: true }, // quantity received
  ordered_quantity: { type: Number, required: true }, // quantity ordered
  price_per_unit: { type: Number, required: true },
  total_cost: { type: Number, required: true },
})

module.exports = mongoose.model('PurchaseOrder', PurchaseOrderSchema)
