const express = require('express')
const router = express.Router()
const PurchaseOrder = require('../models/PurchaseOrder')

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
  const { vendor_id, order_date, items, total_cost } = req.body

  const order = new PurchaseOrder({
    vendor_id: vendor_id,
    order_date: order_date,
    items: items,
    total_cost: total_cost,
  })

  try {
    const newOrder = await order.save()
    res.status(201).json(newOrder)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Update a purchase order
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
