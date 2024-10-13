const express = require('express')
const router = express.Router()
const PurchaseOrder = require('../models/PurchaseOrder')
const Inventory = require('../models/Inventory')

router.get('/', async (req, res) => {
  try {
    const orders = await PurchaseOrder.find()
    res.json(orders)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const order = await PurchaseOrder.findById(req.params.id)
    if (!order)
      return res.status(404).json({ message: 'Purchase Order not found' })
    res.json(order)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.post('/', async (req, res) => {
  const { partId, quantity } = req.body

  try {
    const inventoryItem = await Inventory.findById(partId)
    if (!inventoryItem) {
      return res.status(404).json({ message: 'Inventory part not found' })
    }

    const supplierId = inventoryItem.vendor_id._id
    const pricePerUnit = inventoryItem.price_per_unit
    const totalCost = quantity * pricePerUnit
    const poNumber = PurchaseOrder.countDocuments() + 1

    const newPurchaseOrder = new PurchaseOrder({
      po_number: poNumber,
      supplier: supplierId,
      part: partId,
      quantity: quantity,
      price_per_unit: pricePerUnit,
      total_cost: totalCost,
    })

    const savedPurchaseOrder = await newPurchaseOrder.save()

    inventoryItem.quantity += quantity
    await inventoryItem.save()

    res.status(201).json({
      message: 'Purchase order created successfully',
      purchaseOrder: savedPurchaseOrder,
      updatedInventory: inventoryItem,
    })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const order = await PurchaseOrder.findById(req.params.id)
    if (!order)
      return res.status(404).json({ message: 'Purchase Order not found' })

    order.vendor_id = req.body.vendor_id
    order.order_date = req.body.order_date
    order.items = req.body.items
    order.total_cost = req.body.total_cost

    const updatedOrder = await order.save()
    res.json(updatedOrder)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const order = await PurchaseOrder.findById(req.params.id)
    if (!order)
      return res.status(404).json({ message: 'Purchase Order not found' })

    await order.remove()
    res.json({ message: 'Purchase Order deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
