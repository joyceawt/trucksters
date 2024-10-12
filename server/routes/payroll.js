const express = require('express')
const router = express.Router()
const EmployeeModel = require('../models/employee')
const {
  calculateFederalTax,
  calculateStateTax,
  calculateFICA,
} = require('../utils/taxUtils')

router.post('/payroll/:employeeId', async (req, res) => {
  const { employeeId } = req.params
  const employee = await EmployeeModel.findById(employeeId)

  if (!employee) {
    return res.status(404).json({ message: 'Employee not found' })
  }

  const salary = employee.salary
  const federalTax = calculateFederalTax(salary)
  const stateTax = calculateStateTax(salary, employee.state)
  const { socialSecurityTax, medicareTax, additionalMedicareTax } =
    calculateFICA(salary)

  const totalWithholding =
    federalTax +
    stateTax +
    socialSecurityTax +
    medicareTax +
    additionalMedicareTax
  const netSalary = salary - totalWithholding

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
