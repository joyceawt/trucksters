import { formatAmount } from '../utils/utils'

const PurchaseOrder = ({ po }) => {
  return (
    <tr>
      <td>{po.po_number}</td>
      <td>{new Date(po.date).toLocaleDateString()}</td>
      <td>{po.supplier}</td>
      <td>{po.part}</td>
      <td>{po.ordered_quantity}</td>
      <td>{po.quantity}</td>
      <td>{formatAmount(po.price_per_unit)}</td>
      <td>{formatAmount(po.total_cost)}</td>
    </tr>
  )
}

export default PurchaseOrder
