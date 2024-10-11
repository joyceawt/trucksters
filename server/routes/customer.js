const express = require('express')
const router = express.Router()
const Customer = require('../models/Customer')

router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find()
    res.json(customers)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id)
    if (!customer)
      return res.status(404).json({ message: 'Customer not found' })
    res.json(customer)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.post('/', async (req, res) => {
  const { name, contact_info } = req.body
  const customer = new Customer({
    name: name,
    contact_info: contact_info,
  })

  try {
    const newCustomer = await customer.save()
    res.status(201).json(newCustomer)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id)
    if (!customer)
      return res.status(404).json({ message: 'Customer not found' })

    const { name, contact_info } = req.body

    customer.name = name
    customer.contact_info = contact_info

    const updatedCustomer = await customer.save()
    res.json(updatedCustomer)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id)
    if (!customer)
      return res.status(404).json({ message: 'Customer not found' })

    await customer.remove()
    res.json({ message: 'Customer deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
