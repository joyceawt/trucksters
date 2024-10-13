import { useEffect, useState } from 'react'
import axios from 'axios'
import {
  PurchaseOrdersList,
  UtilityBar,
  CreatePurchaseOrder,
} from '../components'

const PO_PATH = 'http://localhost:4000/api/purchase-orders'

const allPOs = async () => {
  return await axios.get(PO_PATH)
}

export const PurchaseOrderPage = ({ createPO }) => {
  const [purchaseOrders, setPurchaseOrders] = useState([])

  const fetchPurchaseOrders = async () => {
    try {
      const { data } = await allPOs()

      setPurchaseOrders(data)
    } catch (err) {
      console.error(err)
    }
  }

  const onCreatePurchaseOrder = async (po) => {
    try {
      const { data } = await axios.post(PO_PATH, po)

      setPurchaseOrders([...purchaseOrders, data])
      return true
    } catch (err) {
      if (err && err.response && err.response.data) {
        alert(`Error: ${err.response.data.message}`)
      } else {
        alert('Error: Something went wrong. Please try again.')
      }
    }
    return false
  }

  useEffect(() => {
    fetchPurchaseOrders()
  }, [])

  const displayComponent = createPO ? (
    <CreatePurchaseOrder onCreatePurchaseOrder={onCreatePurchaseOrder} />
  ) : (
    <PurchaseOrdersList purchaseOrders={purchaseOrders} />
  )

  return (
    <>
      <section>
        <UtilityBar
          contentTitle='Purchase Order History'
          addLink='/po/create'
        />
      </section>

      {displayComponent}
    </>
  )
}

export default PurchaseOrderPage
