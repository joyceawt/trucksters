const express = require('express')
const router = express.Router()
const Employee = require('../models/Employee')

router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find()
    res.json(employees)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id)
    if (!employee)
      return res.status(404).json({ message: 'Employee not found' })
    res.json(employee)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.post('/', async (req, res) => {
  const { name, position, salary } = req.body
  const employee = new Employee({
    name: name,
    position: position,
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
    const employee = await Employee.findById(req.params.id)
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
    const employee = await Employee.findById(req.params.id)
    if (!employee)
      return res.status(404).json({ message: 'Employee not found' })

    await employee.remove()
    res.json({ message: 'Employee deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
