const express = require('express')
const router = express.Router()
const Invoice = require('../models/Invoice')
const PurchaseOrder = require('../models/PurchaseOrder')
const Employee = require('../models/Employee')
const Inventory = require('../models/Inventory')

const normalizeDate = (date) => {
  const newDate = new Date(date)
  newDate.setHours(0, 0, 0, 0)
  return newDate
}

const generateBalanceSheet = async (balanceDate) => {
  const STARTING_CASH = 200000
  let cash = STARTING_CASH
  let totalCurrentAssets = 0
  let inventoryValue = 0
  let accountsReceivable = 0
  let accountsPayable = 0
  let netWorth = 0
  let payrollExpenses = 0

  const normalizedBalanceDate = normalizeDate(balanceDate)

  // Assets
  // Accounts Receivable
  const invoices = await Invoice.find()
  invoices.forEach((invoice) => {
    const dueDate = normalizeDate(invoice.due_date)

    // if invoice is due before balance sheet, it is considered paid
    if (dueDate <= normalizedBalanceDate) {
      cash += invoice.total_amount
    } else {
      accountsReceivable += invoice.total_amount // Otherwise, it stays in AR
    }
  })

  // payroll expenses (every month)
  const employees = await Employee.find()

  employees.forEach((employee) => {
    employee.payroll.forEach((payroll) => {
      const payrollDate = normalizeDate(payroll.date_paid)

      if (payrollDate < normalizedBalanceDate) {
        payrollExpenses += payroll.amount_paid
      }
    })
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
    const dueDate = normalizeDate(po.due_date)

    // If the PO is due by or before the balance date, treat it as paid
    if (dueDate <= normalizedBalanceDate) {
      cash -= po.total_cost // Deduct from cash
    } else {
      accountsPayable += po.total_cost // Otherwise, it remains unpaid
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

router.get('/', async (req, res) => {
  const balanceDate = req.query.date ? new Date(req.query.date) : new Date()
  try {
    const balanceSheet = await generateBalanceSheet(balanceDate)
    res.json(balanceSheet)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
