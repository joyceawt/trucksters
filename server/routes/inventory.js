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

module.exports = router
