const express = require('express')
const router = express.Router()
const Invoice = require('../models/Invoice')
const Employee = require('../models/Employee')
const Inventory = require('../models/Inventory')
const Expense = require('../models/Expense')
const {
  calculateFederalTax,
  calculateStateTax,
  calculateFICA,
} = require('../utils/taxCalculations')

const TAX_RATE = 0.095 // 9.5% for Illinois corporate income tax

const generateIncomeStatement = async (startDate, endDate) => {
  let sales = 0
  let cogs = 0
  let totalExpenses = 0
  let payrollExpenses = 0
  let payrollWithholding = 0

  // Sales from invoices
  const invoices = await Invoice.find({
    date: { $gte: startDate, $lte: endDate },
  })

  sales = invoices.reduce((acc, invoice) => acc + invoice.total_amount, 0)

  // COGS
  const inventoryItems = await Inventory.find()
  const costPerToy = inventoryItems.reduce((acc, item) => {
    return acc + item.units_per_toy * item.price_per_unit
  }, 0)
  const unitsSold = invoices.reduce((acc, invoice) => acc + invoice.quantity, 0)
  cogs = unitsSold * costPerToy

  const grossProfit = sales - cogs

  // Expenses (excl payroll)
  const expenses = await Expense.find() // these are fixed monthly expenses

  totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0)

  // payroll expenses (Gross salaries)
  const employees = await Employee.find()
  employees.forEach((employee) => {
    const payrollForPeriod = employee.payroll.filter((payroll) => {
      const payrollDate = new Date(payroll.date_paid)
      return payrollDate >= startDate && payrollDate <= endDate
    })

    payrollForPeriod.forEach((payroll) => {
      const withholding =
        payroll.federal_tax_withheld +
        payroll.state_tax_withheld +
        payroll.social_security_tax +
        payroll.medicare_tax
      const grossSalary = payroll.amount_paid + withholding

      payrollWithholding += withholding

      payrollExpenses += grossSalary
    })
  })

  totalExpenses += payrollExpenses

  const incomeBeforeTax = grossProfit - totalExpenses
  const incomeTaxes = incomeBeforeTax * TAX_RATE

  const netIncome = incomeBeforeTax - incomeTaxes

  return {
    sales,
    cogs,
    grossProfit,
    totalExpenses,
    payroll: payrollExpenses,
    payrollWithholding,
    incomeBeforeTax,
    incomeTaxes,
    netIncome,
  }
}

router.get('/', async (req, res) => {
  const startDate = req.query.startDate
    ? new Date(`${req.query.startDate}T00:00:00`)
    : new Date(new Date().getFullYear(), 0, 1) // Jan 1st of the current year
  const endDate = req.query.endDate
    ? new Date(`${req.query.endDate}T23:59:59`)
    : new Date()
  try {
    const incomeStatement = await generateIncomeStatement(startDate, endDate)
    res.json(incomeStatement)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
