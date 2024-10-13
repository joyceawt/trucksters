import { PurchaseOrder } from './index'

const PurchaseOrdersList = ({ purchaseOrders }) => {
  return (
    <section className='d-flex flex-column justify-content-evenly custom-size'>
      <article className='card table-responsive bg-white'>
        <table className='table table-striped table-hover'>
          <caption></caption>
          <thead className='thead-dark'>
            <tr>
              <th>PO Number</th>
              <th>Date</th>
              <th>Supplier</th>
              <th>Part</th>
              <th>Quantity Ordered</th>
              <th>Quantity Received</th>
              <th>Price/Part</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody className='table-group-divider'>
            {purchaseOrders.map((po, i) => (
              <PurchaseOrder key={i} po={po} />
            ))}
          </tbody>
        </table>
      </article>
    </section>
  )
}

export default PurchaseOrdersList
