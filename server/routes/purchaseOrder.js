const express = require('express')
const router = express.Router()
const PurchaseOrder = require('../models/PurchaseOrder')
const Inventory = require('../models/Inventory')

const formattedOrders = (orders) => {
  return orders.map((order) => ({
    ...order._doc,
    supplier: order.supplier.company_name,
    part: order.part.part,
  }))
}

router.get('/', async (req, res) => {
  try {
    const orders = await PurchaseOrder.find()
      .populate('supplier', 'company_name -_id')
      .populate('part', 'part -_id')
      .exec()

    const formattedPOs = formattedOrders(orders)

    res.json(formattedPOs)
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

    const supplierId = inventoryItem.vendor._id
    const pricePerUnit = inventoryItem.price_per_unit
    const totalCost = quantity * pricePerUnit
    const poCount = await PurchaseOrder.countDocuments()
    const poNumber = poCount + 1

    // purchased quantity often differs from the requested quantity
    // randomize adding and subtracting 10% of requested quantity
    const randomIncrease = Math.random() < 0.5 ? true : false
    let quantityReceived = 0
    if (randomIncrease) {
      quantityReceived = Math.ceil(quantity * 1.1)
    } else {
      quantityReceived = Math.floor(quantity * 0.9)
    }

    const newPurchaseOrder = new PurchaseOrder({
      po_number: poNumber,
      date: new Date(),
      due_date: new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        0
      ), // auto set due date to last day of month
      supplier: supplierId,
      part: partId,
      quantity: quantityReceived,
      ordered_quantity: quantity,
      price_per_unit: pricePerUnit,
      total_cost: totalCost,
    })

    const savedPurchaseOrder = await newPurchaseOrder.save()
    await savedPurchaseOrder.populate('supplier', 'company_name -_id')
    await savedPurchaseOrder.populate('part', 'part -_id')

    const formattedPO = formattedOrders([savedPurchaseOrder])[0]

    inventoryItem.quantity += quantityReceived

    await inventoryItem.save()

    res.status(201).json({
      message: `Purchase order created successfully, received ${quantityReceived} parts.`,
      purchaseOrder: formattedPO,
      updatedInventory: inventoryItem,
    })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

module.exports = router
