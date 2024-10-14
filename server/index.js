require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 4000
const dbUrl = process.env.DB_URI

const indexRoute = require('./routes/index')
const employeeRoutes = require('./routes/employee')
const customerRoutes = require('./routes/customer')
const vendorRoutes = require('./routes/vendor')
const inventoryRoutes = require('./routes/inventory')
const purchaseOrderRoutes = require('./routes/purchaseOrder')
const invoiceRoutes = require('./routes/invoice')
const balanceSheet = require('./routes/balanceSheet')
const incomeStatement = require('./routes/incomeStatement')
const payrollRoutes = require('./routes/payroll')
const expenseRoutes = require('./routes/expense')

mongoose
  .connect(dbUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('Error connecting to MongoDB:', err))

app.use(
  cors({
    origin: ['https://trucksters-frontend.vercel.app'],
    methods: ['POST', 'GET'],
    credentials: true,
  })
)
app.use(express.json())

// API routes
app.use('/api/', indexRoute)
app.use('/api/employees', employeeRoutes)
app.use('/api/customers', customerRoutes)
app.use('/api/vendors', vendorRoutes)
app.use('/api/inventory', inventoryRoutes)
app.use('/api/purchase-orders', purchaseOrderRoutes)
app.use('/api/invoices', invoiceRoutes)
app.use('/api/balance-sheet', balanceSheet)
app.use('/api/income-statement', incomeStatement)
app.use('/api/payroll', payrollRoutes)
app.use('/api/expenses', expenseRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
