import { Invoice } from './index'

const InvoicesList = ({ invoices }) => {
  return (
    <section className='d-flex flex-column justify-content-evenly custom-size'>
      <article className='card table-responsive bg-white'>
        <table className='table table-striped table-hover'>
          <caption></caption>
          <thead className='thead-dark'>
            <tr>
              <th>Invoice Number</th>
              <th>Date</th>
              <th>Customer</th>
              <th>Quantity</th>
              <th>Price/Unit</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody className='table-group-divider'>
            {invoices.map((invoice, i) => (
              <Invoice key={i} invoice={invoice} />
            ))}
          </tbody>
        </table>
      </article>
    </section>
  )
}

export default InvoicesList
