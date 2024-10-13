const PurchaseOrder = ({ po }) => {
  return (
    <tr>
      <td>{po.po_number}</td>
      <td>{new Date(po.date).toLocaleDateString()}</td>
      <td>{po.supplier}</td>
      <td>{po.part}</td>
      <td>{po.quantity}</td>
      <td>{po.price_per_part}</td>
      <td>{po.total_cost.toFixed(2)}</td>
    </tr>
  )
}

export default PurchaseOrder
