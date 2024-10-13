const express = require('express')
const router = express.Router()
const Invoice = require('../models/Invoice')
const Customer = require('../models/Customer')
const Inventory = require('../models/Inventory')

const TOY_PRICE_PER_UNIT = 2.5

router.get('/', async (req, res) => {
  try {
    const invoices = await Invoice.find().populate('customer').exec()
    const inventory = await Inventory.findOne()

    res.json({
      invoices,
      complete_units_in_stock: inventory?.complete_units_in_stock || 0,
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id)
    if (!invoice) return res.status(404).json({ message: 'Invoice not found' })
    res.json(invoice)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.post('/', async (req, res) => {
  const { customerId, quantity } = req.body

  const customer = await Customer.findById(customerId)
  if (!customer) {
    return res.status(404).json({ message: 'Customer not found' })
  }

  const totalAmount = quantity * TOY_PRICE_PER_UNIT
  const invoiceNumber = Invoice.countDocuments() + 1

  const invoice = new Invoice({
    price_per_unit: TOY_PRICE_PER_UNIT,
    customer: customerId,
    quantity: quantity,
    total_amount: totalAmount,
    invoice_number: invoiceNumber,
  })

  try {
    const newInvoice = await invoice.save()
    res.status(201).json(newInvoice)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

router.put('/:id', async (req, res) => {
  const { customer_id, invoice_date, items, total_amount } = req.body

  try {
    const invoice = await Invoice.findById(req.params.id)
    if (!invoice) return res.status(404).json({ message: 'Invoice not found' })

    invoice.customer_id = customer_id
    invoice.invoice_date = invoice_date
    invoice.items = items
    invoice.total_amount = total_amount

    const updatedInvoice = await invoice.save()
    res.json(updatedInvoice)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id)
    if (!invoice) return res.status(404).json({ message: 'Invoice not found' })

    await invoice.remove()
    res.json({ message: 'Invoice deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
