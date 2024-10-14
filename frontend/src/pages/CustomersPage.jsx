import { useEffect, useState } from 'react'
import axios from 'axios'
import { CustomersList, UtilityBar, AddCustomer } from '../components'

const CUSTOMERS_PATH = `${process.env.REACT_APP_MONGO_BASE_URL}/customers`

export const allCustomers = async () => {
  return await axios.get(CUSTOMERS_PATH)
}

export const CustomersPage = ({ addCustomer }) => {
  const [customers, setCustomers] = useState([])
  const [sellingPrice, setSellingPrice] = useState(0)

  const fetchCustomers = async () => {
    try {
      const { data } = await allCustomers()
      const { customers, selling_price } = data
      console.log(data)

      setCustomers(customers)
      setSellingPrice(selling_price)
    } catch (err) {
      console.error(err)
    }
  }

  const onAddCustomer = async (customer) => {
    try {
      const { data } = await axios.post(CUSTOMERS_PATH, customer)

      setCustomers([...customers, data])
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
    fetchCustomers()
  }, [])

  const displayContentTitle = addCustomer ? 'Add Customer' : 'Customers'

  const displayComponent = addCustomer ? (
    <AddCustomer onAddCustomer={onAddCustomer} />
  ) : (
    <CustomersList customers={customers} sellingPrice={sellingPrice} />
  )

  const showAddButton = addCustomer ? false : true

  return (
    <>
      <section>
        <UtilityBar
          contentTitle={displayContentTitle}
          addLink='/customers/add'
          showButton={showAddButton}
          showAddButton
        />
      </section>

      {displayComponent}
    </>
  )
}

export default CustomersPage
