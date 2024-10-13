const express = require('express')
const router = express.Router()
const Invoice = require('../models/Invoice')
const PurchaseOrder = require('../models/PurchaseOrder')
const Employee = require('../models/Employee')
const Inventory = require('../models/Inventory')

const generateBalanceSheet = async (balanceDate) => {
  const STARTING_CASH = 200000
  let cash = STARTING_CASH
  let totalCurrentAssets = 0
  let inventoryValue = 0
  let accountsReceivable = 0
  let accountsPayable = 0
  let netWorth = 0
  let payrollExpenses = 0

  // Calculate age in days
  const calculateAgeInDays = (date) => {
    return (
      (balanceDate.getTime() - new Date(date).getTime()) / (1000 * 3600 * 24)
    )
  }

  //Assets
  // Accounts Receivable
  const invoices = await Invoice.find()
  invoices.forEach((invoice) => {
    const invoiceAge = calculateAgeInDays(invoice.date)
    if (invoiceAge >= 30) {
      cash += invoice.total_amount // Move receivable to cash after 30 days
    } else {
      accountsReceivable += invoice.total_amount // Else, it is still in accounts receivable
    }
  })

  // payroll expenses (every month)
  const employees = await Employee.find()
  employees.forEach((employee) => {
    payrollExpenses += employee.payroll.reduce(
      (acc, payroll) => acc + payroll.amount_paid,
      0
    )
  })

  cash -= payrollExpenses

  // Inventory
  const inventoryItems = await Inventory.find()
  inventoryItems.forEach((item) => {
    inventoryValue += item.price_per_unit * item.quantity
  })

  totalCurrentAssets = cash + accountsReceivable + inventoryValue

  const landBuilding = 0
  const equipmentFix = 0
  const totalFixedAssets = 0
  const totalAssets =
    totalCurrentAssets + landBuilding + equipmentFix + totalFixedAssets

  // Liabilites
  const notesPayable = 0

  const POs = await PurchaseOrder.find()
  POs.forEach((po) => {
    const poAge = calculateAgeInDays(po.date)
    if (poAge >= 30) {
      cash -= po.total_cost // Deduct from cash after 30 days
    } else {
      accountsPayable += po.total_cost // Else, it's still in accounts payable
    }
  })

  const accruals = 0
  const totalCurrentLiabilities = notesPayable + accountsPayable + accruals

  const mortgage = 0
  const totalLongTermDebt = 0
  netWorth = totalAssets - totalCurrentLiabilities - totalLongTermDebt

  const totalLiabilitiesAndNetWorth = totalCurrentLiabilities + netWorth

  return {
    assets: {
      cash,
      accountsReceivable,
      inventory: inventoryValue,
      totalCurrentAssets: totalCurrentAssets,
      landBuilding,
      equipmentFix,
      totalFixedAssets,
      totalAssets,
    },
    liabilities: {
      notesPayable,
      accountsPayable,
      accruals,
      totalCurrentLiabilities,
      mortgage,
      totalLongTermDebt,
    },
    netWorth,
    totalLiabilitiesAndNetWorth,
  }
}

router.get('/balance-sheet', async (req, res) => {
  const balanceDate = req.query.date ? new Date(req.query.date) : new Date()
  try {
    const balanceSheet = await generateBalanceSheet(balanceDate)
    res.json(balanceSheet)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
