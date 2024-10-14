import { formatAmount } from '../utils/utils'
const Invoice = ({ invoice }) => {
  return (
    <tr>
      <td>{invoice.invoice_number}</td>
      <td>{new Date(invoice.date).toLocaleDateString()}</td>
      <td>{invoice.customer}</td>
      <td>{invoice.quantity}</td>
      <td>{formatAmount(invoice.price_per_unit)}</td>
      <td>{formatAmount(invoice.total_amount)}</td>
    </tr>
  )
}

export default Invoice
