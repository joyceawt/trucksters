import { Vendor } from './index'

const VendorsList = ({ vendors }) => {
  return (
    <section className='d-flex flex-column justify-content-evenly custom-size'>
      <article className='card table-responsive bg-white'>
        <table className='table table-striped table-hover'>
          <caption></caption>
          <thead className='thead-dark'>
            <tr>
              <th>Company Name</th>
              <th>Part</th>
              <th>Price/Unit</th>
              <th>Address Line 1</th>
              <th>Address Line 2</th>
              <th>City</th>
              <th>State</th>
              <th>Zip</th>
            </tr>
          </thead>
          <tbody className='table-group-divider'>
            {vendors.map((vendor, i) => (
              <Vendor key={i} vendor={vendor} />
            ))}
          </tbody>
        </table>
      </article>
    </section>
  )
}

export default VendorsList
