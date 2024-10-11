const express = require('express')
const router = express.Router()
const Invoice = require('../models/Invoice')

router.get('/', async (req, res) => {
  try {
    const invoices = await Invoice.find()
    res.json(invoices)
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
  const { customer_id, invoice_date, items, total_amount } = req.body

  const invoice = new Invoice({
    customer_id,
    invoice_date,
    items,
    total_amount,
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
