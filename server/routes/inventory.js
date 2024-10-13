const express = require('express')
const router = express.Router()
const Inventory = require('../models/Inventory')
const Product = require('../models/Product')

router.get('/', async (req, res) => {
  try {
    const inventory = await Inventory.find()
    const product = await Product.findOne()
    res.json({
      inventory,
      complete_toys_in_stock: product?.quantity || 0,
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// router.get('/:id', async (req, res) => {
//   try {
//     const item = await Inventory.findById(req.params.id)
//     if (!item) return res.status(404).json({ message: 'Item not found' })
//     res.json(item)
//   } catch (err) {
//     res.status(500).json({ message: err.message })
//   }
// })

// router.post('/', async (req, res) => {
//   const { part, quantity, pricePerUnit, reorderPoints, unitsPerToy } = req.body

//   try {
//     const vendor = await Vendor.findOne({ part })

//     const item = new Inventory({
//       part: part,
//       quantity: quantity,
//       price_per_unit: pricePerUnit,
//       vendorId: vendor._id || null,
//       reorder_points: reorderPoints,
//       units_per_toy: unitsPerToy,
//     })

//     const newItem = await item.save()
//     res.status(201).json(newItem)
//   } catch (err) {
//     res.status(400).json({ message: err.message })
//   }
// })

// router.put('/:id', async (req, res) => {
//   try {
//     const item = await Inventory.findById(req.params.id)
//     if (!item) return res.status(404).json({ message: 'Item not found' })

//     const { item_name, quantity, unit_cost, reorder_point, type, vendor_id } =
//       req.body

//     item.item_name = item_name
//     item.quantity = quantity
//     item.unit_cost = unit_cost
//     item.reorder_point = reorder_point
//     item.type = type
//     item.vendor_id = vendor_id

//     const updatedItem = await item.save()
//     res.json(updatedItem)
//   } catch (err) {
//     res.status(400).json({ message: err.message })
//   }
// })

// router.delete('/:id', async (req, res) => {
//   try {
//     const item = await Inventory.findById(req.params.id)
//     if (!item) return res.status(404).json({ message: 'Item not found' })

//     await item.remove()
//     res.json({ message: 'Item deleted' })
//   } catch (err) {
//     res.status(500).json({ message: err.message })
//   }
// })

module.exports = router
