const express = require('express')
const router = express.Router()
const EmployeeModel = require('../models/employee')

router.get('/', async (req, res) => {
  try {
    const employees = await EmployeeModel.find()
    res.json(employees)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const employee = await EmployeeModel.findById(req.params.id)
    if (!employee)
      return res.status(404).json({ message: 'Employee not found' })
    res.json(employee)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.post('/', async (req, res) => {
  const {
    firstName,
    lastName,
    address1,
    address2,
    city,
    salary,
    state,
    ssn,
    noWithholdings,
    zip,
  } = req.body
  const employee = new EmployeeModel({
    first_name: firstName,
    last_name: lastName,
    address_1: address1,
    address_2: address2,
    city: city,
    state: state,
    zip: zip,
    ssn: ssn,
    withholdings: noWithholdings,
    salary: salary,
  })

  try {
    const newEmployee = await employee.save()
    res.status(201).json(newEmployee)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const employee = await EmployeeModel.findById(req.params.id)
    if (!employee)
      return res.status(404).json({ message: 'Employee not found' })

    const { name, position, salary } = req.body

    employee.name = name
    employee.position = position
    employee.salary = salary

    const updatedEmployee = await employee.save()
    res.json(updatedEmployee)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const employee = await EmployeeModel.findById(req.params.id)
    if (!employee)
      return res.status(404).json({ message: 'Employee not found' })

    await employee.remove()
    res.json({ message: 'Employee deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
