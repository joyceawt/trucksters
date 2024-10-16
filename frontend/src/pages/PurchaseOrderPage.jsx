import { useEffect, useState } from 'react'
import axios from 'axios'
import {
  PurchaseOrdersList,
  UtilityBar,
  CreatePurchaseOrder,
} from '../components'

const PO_PATH = `${process.env.REACT_APP_MONGO_BASE_URL}/purchase-orders`

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
      const { purchaseOrder } = data

      setPurchaseOrders([...purchaseOrders, purchaseOrder])
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

  const displayContentTitle = createPO
    ? 'Create Purchase Order'
    : 'Purchase Order History'

  useEffect(() => {
    fetchPurchaseOrders()
  }, [])

  const displayComponent = createPO ? (
    <CreatePurchaseOrder onCreatePo={onCreatePurchaseOrder} />
  ) : (
    <PurchaseOrdersList purchaseOrders={purchaseOrders} />
  )

  const showAddButton = createPO ? false : true

  return (
    <>
      <section>
        <UtilityBar
          contentTitle={displayContentTitle}
          addLink='/po/create'
          showButton={showAddButton}
        />
      </section>

      {displayComponent}
    </>
  )
}

export default PurchaseOrderPage
