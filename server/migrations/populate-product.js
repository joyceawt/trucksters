require('dotenv').config()
const mongoose = require('mongoose')
const Product = require('../models/Product')

const dbUrl = process.env.DB_URI

async function populateProduct() {
  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('Connected to MongoDB.')

    const newProduct = new Product({
      name: 'Toy Truck',
      quantity: 0,
      selling_price: 15.0,
      cost_per_toy: 0.57,
    })

    await newProduct.save()

    console.log('Migration complete.')
  } catch (err) {
    console.error('Error during migration:', err)
  } finally {
    mongoose.connection.close()
  }
}

populateProduct()
