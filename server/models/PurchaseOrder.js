const mongoose = require('mongoose')

const PurchaseOrderItemSchema = new mongoose.Schema({
  item_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Inventory' },
  item_name: String,
  quantity: Number,
  cost_per_item: Number,
})

const PurchaseOrderSchema = new mongoose.Schema({
  vendor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
  order_date: { type: Date, required: true },
  items: [PurchaseOrderItemSchema],
  total_cost: { type: Number, required: true },
  created_at: { type: Date, default: Date.now },
})

module.exports = mongoose.model('PurchaseOrder', PurchaseOrderSchema)
