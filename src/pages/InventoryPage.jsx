import { useEffect, useState } from 'react'
import axios from 'axios'
import { InventoryList, UtilityBar } from '../components'

const INVENTORY_PATH = 'http://localhost:4000/api/inventory'

export const allInventory = async () => {
  const { data } = await axios.get(INVENTORY_PATH)
  return data
}

export const InventoryPage = () => {
  const [inventoryItems, setInventoryItems] = useState([])
  const [completeToysInStock, setCompleteToysInStock] = useState(0)

  const fetchInventory = async () => {
    try {
      const { inventory, complete_toys_in_stock } = await allInventory()

      setInventoryItems(inventory)
      setCompleteToysInStock(complete_toys_in_stock)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchInventory()
  }, [])

  return (
    <>
      <section>
        <UtilityBar contentTitle='Inventory' />
      </section>

      <InventoryList
        inventoryItems={inventoryItems}
        completeToysInStock={completeToysInStock}
      />
    </>
  )
}

export default InventoryPage
