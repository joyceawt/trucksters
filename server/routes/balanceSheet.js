const express = require('express')
const router = express.Router()
const Invoice = require('../models/Invoice')
const PurchaseOrder = require('../models/PurchaseOrder')
const Payroll = require('../models/Payroll')

const calculateBalanceSheet = async () => {
  let assets = 0
  let liabilities = 0

  // Calculate assets from unpaid invoices (accounts receivable)
  const invoices = await Invoice.find()
  invoices.forEach((invoice) => {
    assets += invoice.total_amount
  })

  // Calculate liabilities from unpaid purchase orders (accounts payable)
  const purchaseOrders = await PurchaseOrder.find()
  purchaseOrders.forEach((po) => {
    liabilities += po.total_cost
  })

  // Add payroll liabilities if any exist
  const payrolls = await Payroll.find()
  payrolls.forEach((payroll) => {
    liabilities += payroll.gross_salary
  })

  const equity = assets - liabilities

  return {
    assets,
    liabilities,
    equity,
  }
}

router.get('/balance-sheet', async (req, res) => {
  try {
    const balanceSheet = await calculateBalanceSheet()
    res.json(balanceSheet)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
