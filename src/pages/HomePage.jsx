import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

function HomePage() {
  const date = new Date().getHours()
  const greeting =
    date < 12 ? 'Good Morning' : date < 18 ? 'Good Afternoon' : 'Good Evening'
  const icon =
    date < 12 ? (
      <i className='greeting bi bi-brightness-alt-low-fill'></i>
    ) : date < 18 ? (
      <i className='greeting bi bi-brightness-high-fill'></i>
    ) : (
      <i className='greeting bi bi-moon-stars-fill'></i>
    )

  return (
    <section
      className='d-flex flex-column align-content-center justify-content-center custom-size  pt-4 pb-4'
      id='mainContent'
    >
      <article
        className='d-flex flex-column align-content-center justify-content-center rounded p-1'
        id='content-1'
      >
        <div className='p-3'>
          <h4 className='footer-font-color'>
            {greeting} {icon}
          </h4>
          <p className='lh-lg'>Welcome to Truckster's Site.</p>
        </div>

        <div className='row p-4 '>
          <div className='col-sm-6 p-3'>
            <div className='card text-center bg-pink'>
              <div className='card-body '>
                <h5 className='card-title'>Employees</h5>
                <p className='card-text'>
                  Preview all employees and add employees.{' '}
                </p>
                <Button variant='primary' as={Link} to='/employees'>
                  View Employees
                </Button>{' '}
                <Button variant='primary' as={Link} to='/employees/add'>
                  Add Employees
                </Button>{' '}
              </div>
            </div>
          </div>

          <div className='col-sm-6 p-3'>
            <div className='card text-center bg-pink'>
              <div className='card-body'>
                <h5 className='card-title'>Payroll</h5>
                <p className='card-text'>
                  Pay employees and view the payroll.{' '}
                </p>
                <Button variant='primary' as={Link} to='/pay-employee'>
                  Pay Employee
                </Button>{' '}
                <Button variant='primary' as={Link} to='/payroll'>
                  Payroll
                </Button>{' '}
              </div>
            </div>
          </div>

          <div className='col-sm-6 p-3'>
            <div className='card text-center bg-pink'>
              <div className='card-body'>
                <h5 className='card-title'>Customers</h5>
                <p className='card-text'>
                  Preview all customers and add customers.{' '}
                </p>
                <Button variant='primary' as={Link} to='/customers'>
                  View Customers
                </Button>{' '}
                <Button variant='primary' as={Link} to='/customers/add'>
                  Add Customer
                </Button>{' '}
              </div>
            </div>
          </div>

          <div className='col-sm-6 p-3'>
            <div className='card text-center bg-pink'>
              <div className='card-body'>
                <h5 className='card-title'>Vendors</h5>
                <p className='card-text'>
                  Preview all vendors and add vendors.{' '}
                </p>
                <Button variant='primary' as={Link} to='/customers'>
                  View Vendors
                </Button>{' '}
                <Button variant='primary' as={Link} to='/customers/add'>
                  Add Vendor
                </Button>{' '}
              </div>
            </div>
          </div>

          <div className='col-sm-6 p-3'>
            <div className='card text-center bg-pink'>
              <div className='card-body'>
                <h5 className='card-title'>Inventory</h5>
                <p className='card-text'>Preview all inventory.</p>
                <Button variant='primary' as={Link} to='/inventory'>
                  View Inventory
                </Button>{' '}
              </div>
            </div>
          </div>

          <div className='col-sm-6 p-3'>
            <div className='card text-center bg-pink'>
              <div className='card-body'>
                <h5 className='card-title'>Invoice</h5>
                <p className='card-text'>
                  Create an invoice and preview invoice history.{' '}
                </p>
                <Button variant='primary' as={Link} to='/invoices/add'>
                  Create Invoice
                </Button>{' '}
                <Button variant='primary' as={Link} to='/invoices'>
                  Invoice History
                </Button>{' '}
              </div>
            </div>
          </div>

          <div className='col-sm-6 p-3'>
            <div className='card text-center bg-pink'>
              <div className='card-body'>
                <h5 className='card-title'>Purchase Order</h5>
                <p className='card-text'>Create PO and preview PO history.</p>
                <Button variant='primary' as={Link} to='/invoices/add'>
                  Create PO
                </Button>{' '}
                <Button variant='primary' as={Link} to='/invoices'>
                  PO History
                </Button>{' '}
              </div>
            </div>
          </div>

          <div className='col-sm-6 p-3'>
            <div className='card text-center bg-pink'>
              <div className='card-body'>
                <h5 className='card-title'>Balance Sheet & Income Statement</h5>
                <p className='card-text'>
                  View balance sheet and income statement.
                </p>
                <Button variant='primary' as={Link} to='/balance-sheet'>
                  Balance Sheet
                </Button>{' '}
                <Button variant='primary' as={Link} to='/income-statement'>
                  Income Statement
                </Button>{' '}
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>
  )
}

export default HomePage
