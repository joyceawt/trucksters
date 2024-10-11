const mongoose = require('mongoose')

const InventorySchema = new mongoose.Schema({
  item_name: { type: String, required: true },
  quantity: { type: Number, required: true, default: 0 },
  unit_cost: { type: Number, required: true },
  reorder_point: { type: Number, default: 10 },
  type: {
    type: String,
    enum: ['raw_material', 'finished_good'],
    required: true,
  },
  vendor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
  created_at: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Inventory', InventorySchema)
