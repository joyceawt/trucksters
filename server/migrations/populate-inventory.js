require('dotenv').config()
const mongoose = require('mongoose')
const Vendor = require('../models/Vendor')
const Inventory = require('../models/Inventory')
const bom = require('../utils/bom')

const dbUrl = process.env.DB_URI

async function populateInventory() {
  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('Connected to MongoDB.')

    for (const item of bom) {
      const vendor = await Vendor.findOne({ company_name: item.vendor_name })

      const newItem = new Inventory({
        part: item.part,
        quantity: 0,
        price_per_unit: item.price_per_unit,
        reorder_points: 30,
        vendor: vendor._id,
        units_per_toy: item.units_per_toy,
        cost_per_toy: item.units_per_toy * item.price_per_unit,
      })

      await newItem.save()
      console.log(`Inserted ${item.part} into inventory.`)
    }

    console.log('Migration complete.')
  } catch (err) {
    console.error('Error during migration:', err)
  } finally {
    mongoose.connection.close()
  }
}

populateInventory()
