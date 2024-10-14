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

module.exports = router
