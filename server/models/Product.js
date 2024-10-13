const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true, default: 'Toy Truck' },
  quantity: { type: Number, required: true, default: 0 },
  selling_price: { type: Number, required: true },
  cost_per_toy: { type: Number, required: true }, // based on cost of parts
})

module.exports = mongoose.model('Product', ProductSchema)
