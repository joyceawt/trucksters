const express = require('express')
const router = express.Router()
const EmployeeModel = require('../models/Employee')
const {
  calculateFederalTax,
  calculateStateTax,
  calculateFICA,
} = require('../utils/taxCalculations')

router.post('/:employeeId', async (req, res) => {
  const { employeeId } = req.params
  const employee = await EmployeeModel.findById(employeeId)

  if (!employee) {
    return res.status(404).json({ message: 'Employee not found' })
  }

  const annualSalary = employee.salary
  const monthlySalary = annualSalary / 12
  const federalTax = calculateFederalTax(monthlySalary)
  const stateTax = calculateStateTax(monthlySalary, employee.state)
  const { socialSecurityTax, medicareTax, additionalMedicareTax } =
    calculateFICA(monthlySalary)

  const totalWithholding =
    federalTax +
    stateTax +
    socialSecurityTax +
    medicareTax +
    additionalMedicareTax
  const netSalary = monthlySalary - totalWithholding

  const payrollEvent = {
    date_paid: new Date(),
    federal_tax_withheld: federalTax,
    state_tax_withheld: stateTax,
    social_security_tax: socialSecurityTax,
    medicare_tax: medicareTax,
    amount_paid: netSalary,
  }

  employee.payroll.push(payrollEvent)

  try {
    await employee.save()
    res
      .status(201)
      .json({ message: 'Payroll processed successfully', payrollEvent })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
