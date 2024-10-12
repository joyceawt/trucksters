const express = require('express')
const router = express.Router()
const Vendor = require('../models/Vendor')

router.get('/', async (req, res) => {
  try {
    const vendors = await Vendor.find()
    res.json(vendors)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id)
    if (!vendor) return res.status(404).json({ message: 'Vendor not found' })
    res.json(vendor)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.post('/', async (req, res) => {
  const {
    companyName,
    part,
    pricePerUnit,
    address1,
    address2,
    city,
    state,
    zip,
  } = req.body
  const vendor = new Vendor({
    company_name: companyName,
    part: part,
    price_per_unit: pricePerUnit,
    address_1: address1,
    address_2: address2,
    city: city,
    state: state,
    zip: zip,
  })

  try {
    const newVendor = await vendor.save()
    res.status(201).json(newVendor)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Update a vendor
router.put('/:id', async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id)
    if (!vendor) return res.status(404).json({ message: 'Vendor not found' })

    const { name, contact_info } = req.body

    vendor.name = name
    vendor.contact_info = contact_info

    const updatedVendor = await vendor.save()
    res.json(updatedVendor)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Delete a vendor
router.delete('/:id', async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id)
    if (!vendor) return res.status(404).json({ message: 'Vendor not found' })

    await vendor.remove()
    res.json({ message: 'Vendor deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
