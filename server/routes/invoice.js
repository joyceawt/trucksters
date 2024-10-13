const express = require('express')
const router = express.Router()
const Invoice = require('../models/Invoice')
const Customer = require('../models/Customer')
const Product = require('../models/Product')

router.get('/', async (req, res) => {
  try {
    const invoices = await Invoice.find().populate('customer').exec()

    res.json(invoices)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.post('/', async (req, res) => {
  const { customerId, quantity } = req.body

  try {
    const customer = await Customer.findById(customerId)
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' })
    }

    const product = await Product.findOne()

    if (product.quantity < quantity) {
      return res.status(400).json({
        message: 'Not enough toys in stock',
      })
    }

    product.quantity -= quantity

    const totalAmount = quantity * product.selling_price
    const invoiceNumber = Invoice.countDocuments() + 1

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
    await product.save()

    res.status(201).json({
      invoice: newInvoice,
      message: 'Invoice created successfully',
    })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

module.exports = router
