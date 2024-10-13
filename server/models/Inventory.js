const mongoose = require('mongoose')

const InventorySchema = new mongoose.Schema({
  part: { type: String, required: true },
  quantity: { type: Number, required: true, default: 0 },
  price_per_unit: { type: Number, required: true },
  reorder_points: { type: Number, default: 30 },
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
  units_per_toy: { type: Number, required: true },
  complete_units_in_stock: { type: Number, default: 0 },
})

module.exports = mongoose.model('Inventory', InventorySchema)
