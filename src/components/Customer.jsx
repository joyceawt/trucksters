import { formatAmount } from '../utils/utils'

const Customer = ({ customer, sellingPrice }) => {
  return (
    <tr>
      <td>{customer.company_name}</td>
      <td>{customer.last_name}</td>
      <td>{customer.first_name}</td>
      <td>{customer.address_1}</td>
      <td>{customer.address_2}</td>
      <td>{customer.city}</td>
      <td>{customer.state}</td>
      <td>{customer.zip}</td>
      <td>{formatAmount(sellingPrice)}</td>
    </tr>
  )
}

export default Customer
