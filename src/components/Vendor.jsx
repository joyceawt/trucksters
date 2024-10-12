const Vendor = ({ vendor }) => {
  return (
    <tr>
      <td>{vendor.company_name}</td>
      <td>{vendor.part}</td>
      <td>{vendor.price_per_unit}</td>
      <td>{vendor.address_1}</td>
      <td>{vendor.address_2}</td>
      <td>{vendor.city}</td>
      <td>{vendor.state}</td>
      <td>{vendor.zip}</td>
    </tr>
  )
}

export default Vendor
