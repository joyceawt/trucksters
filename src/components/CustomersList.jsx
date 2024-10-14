import { Customer } from './index'

const CustomersList = ({ customers, sellingPrice }) => {
  return (
    <section className='d-flex flex-column justify-content-evenly custom-size'>
      <article className='card table-responsive bg-white'>
        <table className='table table-striped table-hover'>
          <caption></caption>
          <thead className='thead-dark'>
            <tr>
              <th>Company Name</th>
              <th>Last Name</th>
              <th>First Name</th>
              <th>Address Line 1</th>
              <th>Address Line 2</th>
              <th>City</th>
              <th>State</th>
              <th>Zip</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody className='table-group-divider'>
            {customers.map((customer, i) => (
              <Customer
                key={i}
                customer={customer}
                sellingPrice={sellingPrice}
              />
            ))}
          </tbody>
        </table>
      </article>
    </section>
  )
}

export default CustomersList
