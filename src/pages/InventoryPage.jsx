import { useEffect, useState } from 'react'
import axios from 'axios'
import { InventoryList, UtilityBar } from '../components'

const INVENTORY_PATH = 'http://localhost:4000/api/inventory'

export const allInventory = async () => {
  return await axios.get(INVENTORY_PATH)
}

export const InventoryPage = () => {
  const [inventoryItems, setInventoryItems] = useState([])

  const fetchInventory = async () => {
    try {
      const { data } = await allInventory()

      setInventoryItems(data)
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

      <InventoryList inventoryItems={inventoryItems} />
    </>
  )
}

export default InventoryPage
