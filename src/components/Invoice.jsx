const Invoice = ({ invoice }) => {
  return (
    <tr>
      <td>{invoice.invoice_number}</td>
      <td>{new Date(invoice.invoice_date).toLocaleDateString()}</td>
      <td>{invoice.customer.company_name}</td>
      <td>{invoice.quantity}</td>
      <td>{invoice.price_per_unit}</td>
      <td>{invoice.total_amount.toFixed(2)}</td>
    </tr>
  )
}

export default Invoice
