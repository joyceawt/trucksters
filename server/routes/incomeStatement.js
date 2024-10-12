const express = require('express')
const router = express.Router()
const Invoice = require('../models/Invoice')
const PurchaseOrder = require('../models/PurchaseOrder')
const Payroll = require('../models/Payroll')

const calculateIncomeStatement = async () => {
  let revenue = 0
  let expenses = 0

  // Calculate revenue from paid invoices
  const invoices = await Invoice.find()
  invoices.forEach((invoice) => {
    revenue += invoice.total_amount
  })

  // Calculate expenses from purchase orders and payroll
  const purchaseOrders = await PurchaseOrder.find()
  purchaseOrders.forEach((po) => {
    expenses += po.total_cost
  })

  const payrolls = await Payroll.find()
  payrolls.forEach((payroll) => {
    expenses += payroll.gross_salary
  })

  const netIncome = revenue - expenses

  return {
    revenue,
    expenses,
    netIncome,
  }
}

router.get('/income-statement', async (req, res) => {
  try {
    const incomeStatement = await calculateIncomeStatement()
    res.json(incomeStatement)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
