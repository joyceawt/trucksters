import { BrowserRouter, Routes, Route } from 'react-router-dom'

// components
import { Nav, Header, Footer } from './components'

// Pages
import {
  HomePage,
  EmployeesPage,
  CustomersPage,
  VendorsPage,
  PayrollPage,
  InventoryPage,
  InvoicesPage,
} from './pages'

function App() {
  const title = 'Trucksters'

  return (
    <div className='App'>
      <div className='container-fluid p-0'>
        <div className='d-flex min-vh-100'>
          <BrowserRouter>
            <Nav />
            <div className='p2 flex-grow-1 p-5 flex-column align-items-center justify-content-center'>
              <Header title={title} />

              <main className='custom-size'>
                <Routes>
                  <Route path='/' element={<HomePage />} />
                  <Route
                    path='/employees'
                    element={<EmployeesPage addEmployee={false} />}
                  />
                  <Route
                    path='/employees/add'
                    element={<EmployeesPage addEmployee={true} />}
                  />
                  <Route
                    path='/customers'
                    element={<CustomersPage addCustomer={false} />}
                  />
                  <Route
                    path='/customers/add'
                    element={<CustomersPage addCustomer={true} />}
                  />
                  <Route
                    path='/vendors'
                    element={<VendorsPage addVendor={false} />}
                  />
                  <Route
                    path='/vendors/add'
                    element={<VendorsPage addVendor={true} />}
                  />
                  <Route path='/payroll' element={<PayrollPage />} />
                  <Route path='/inventory' element={<InventoryPage />} />
                  <Route
                    path='/invoices'
                    element={<InvoicesPage createInvoice={false} />}
                  />
                  <Route
                    path='/invoices/create'
                    element={<InvoicesPage createInvoice={true} />}
                  />
                </Routes>
                <Footer />
              </main>
            </div>
          </BrowserRouter>
        </div>
      </div>
    </div>
  )
}

export default App
