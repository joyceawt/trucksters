const InventoryList = ({ inventoryItems, completeToysInStock }) => {
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

  const buildCapacity = () => {
    if (inventoryItems.length === 0) {
      return 0
    }

    const toysPerPart = inventoryItems.map((item) => {
      return Math.floor(item.quantity / item.units_per_toy)
    })

    return Math.min(...toysPerPart)
  }

  const totalValue = () => {
    return buildCapacity() * cogPerUnit() || 0
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
                <td>${inventoryItem.price_per_unit}</td>
                <td>{inventoryItem.quantity}</td>
                <td>{inventoryItemValue(inventoryItem).toFixed(2)}</td>
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
              <td>{inventoryTotal().toFixed(2)}</td>
              <td>${cogPerUnit().toFixed(2)}</td>
              <td>{buildCapacity()}</td>
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
              <td>${totalValue().toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </article>
    </section>
  )
}

export default InventoryList
