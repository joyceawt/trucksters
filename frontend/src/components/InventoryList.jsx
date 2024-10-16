import { formatAmount } from '../utils/utils'

export const buildCapacity = (inventoryItems) => {
  if (!inventoryItems || inventoryItems.length === 0) {
    return 0
  }

  const toysPerPart = inventoryItems.map((item) => {
    return Math.floor(item.quantity / item.units_per_toy)
  })

  const minToys = Math.min(...toysPerPart)

  return minToys > 0 ? minToys : 0
}

export const InventoryList = ({ inventoryItems, completeToysInStock }) => {
  const inventoryItemValue = (inventoryItem) => {
    return inventoryItem.price_per_unit * inventoryItem.quantity
  }

  const reorderItem = (inventoryItem) => {
    return inventoryItem.quantity < inventoryItem.reorder ? 'X' : ''
  }

  const cogPerUnit = () => {
    return inventoryItems
      .map((item) => item.price_per_unit * item.units_per_toy) // cost per part
      .reduce((acc, cog) => acc + cog, 0) // sum all parts' cost
  }

  const inventoryTotal = () => {
    return inventoryItems
      .map((item) => inventoryItemValue(item))
      .reduce((a, b) => a + b, 0)
  }

  const totalValue = () => {
    return completeToysInStock * cogPerUnit() || 0
  }

  return (
    <section className='d-flex flex-column justify-content-evenly custom-size'>
      <article className='card table-responsive bg-white'>
        <table className='table table-striped table-hover'>
          <caption></caption>
          <thead className='thead-dark'>
            <tr>
              <th>Part</th>
              <th>Price/Unit</th>
              <th>Quantity</th>
              <th>Value</th>
              <th>Re-order</th>
            </tr>
          </thead>
          <tbody className='table-group-divider'>
            {inventoryItems.map((inventoryItem, i) => (
              <tr key={i}>
                <td>{inventoryItem.part}</td>
                <td>{formatAmount(inventoryItem.price_per_unit)}</td>
                <td>{inventoryItem.quantity}</td>
                <td>{formatAmount(inventoryItemValue(inventoryItem))}</td>
                <td>{reorderItem(inventoryItem)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <table className='table table-striped table-hover'>
          <caption></caption>
          <thead className='thead-dark'>
            <tr>
              <th>Total</th>
              <th>COG/Unit</th>
              <th>Total Units that can be built from current parts</th>
            </tr>
          </thead>
          <tbody className='table-group-divider'>
            <tr>
              <td>{formatAmount(inventoryTotal())}</td>
              <td>{formatAmount(cogPerUnit())}</td>
              <td>{buildCapacity(inventoryItems)}</td>
            </tr>
          </tbody>
        </table>

        <table className='table table-striped table-hover'>
          <caption></caption>
          <thead className='thead-dark'>
            <tr>
              <th>Complete Units in Stock</th>
              <th>Total Value</th>
            </tr>
          </thead>
          <tbody className='table-group-divider'>
            <tr>
              <td>{completeToysInStock}</td>
              <td>{formatAmount(totalValue())}</td>
            </tr>
          </tbody>
        </table>
      </article>
    </section>
  )
}

export default InventoryList
