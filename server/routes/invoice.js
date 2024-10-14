const express = require('express')
const router = express.Router()
const Invoice = require('../models/Invoice')
const Customer = require('../models/Customer')
const Product = require('../models/Product')
const Inventory = require('../models/Inventory')

const formattedInvoice = (invoices) => {
  return invoices.map((invoice) => ({
    ...invoice._doc,
    customer: invoice.customer.company_name,
  }))
}

router.get('/', async (req, res) => {
  try {
    const invoices = await Invoice.find()
      .populate('customer', 'company_name -_id')
      .exec()

    const formattedInv = formattedInvoice(invoices)

    res.json(formattedInv)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

const buildToysFromParts = async (remainingToysNeeded) => {
  const inventoryItems = await Inventory.find()

  if (!inventoryItems || inventoryItems.length === 0) {
    return false
  }

  const buildCapacity = inventoryItems.map((item) => {
    return Math.floor(item.quantity / item.units_per_toy)
  })

  const minToys = Math.min(...buildCapacity)
  const maxToysBuildable = minToys > 0 ? minToys : 0

  if (maxToysBuildable < remainingToysNeeded) {
    return false
  }

  inventoryItems.forEach((item) => {
    const partsNeeded = remainingToysNeeded * item.units_per_toy
    item.quantity -= partsNeeded
  })

  await Promise.all(inventoryItems.map((item) => item.save()))

  return true
}

router.post('/', async (req, res) => {
  const { customerId, quantity } = req.body

  try {
    const customer = await Customer.findById(customerId)
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' })
    }

    const product = await Product.findOne()

    if (product.quantity < quantity) {
      const remainingToysNeeded = quantity - product.quantity

      const canBuildToys = await buildToysFromParts(remainingToysNeeded)

      if (!canBuildToys) {
        return res.status(400).json({
          message: 'Not enough toys in stock',
        })
      }

      product.quantity += remainingToysNeeded
    }

    product.quantity -= quantity

    const totalAmount = quantity * product.selling_price
    const invoiceCount = await Invoice.countDocuments()
    const invoiceNumber = invoiceCount + 1

    const invoice = new Invoice({
      price_per_unit: product.selling_price,
      customer: customerId,
      quantity: quantity,
      total_amount: totalAmount,
      invoice_number: invoiceNumber,
      date: new Date(),
      due_date: new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        0
      ), // auto set due date to last day of month
    })

    const newInvoice = await invoice.save()
    await newInvoice.populate('customer', 'company_name -_id')

    const formattedInv = formattedInvoice([newInvoice])[0]

    await product.save()

    res.status(201).json({
      invoice: formattedInv,
      message: 'Invoice created successfully',
    })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

module.exports = router
