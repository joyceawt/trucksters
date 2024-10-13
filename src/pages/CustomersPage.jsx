import { useEffect, useState } from 'react'
import axios from 'axios'
import { CustomersList, UtilityBar, AddCustomer } from '../components'

const CUSTOMERS_PATH = 'http://localhost:4000/api/customers'

export const allCustomers = async () => {
  return await axios.get(CUSTOMERS_PATH)
}

export const CustomersPage = ({ addCustomer }) => {
  const [customers, setCustomers] = useState([])

  const fetchCustomers = async () => {
    try {
      const { data } = await allCustomers()

      setCustomers(data)
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
    <CustomersList customers={customers} />
  )

  return (
    <>
      <section>
        <UtilityBar
          contentTitle={displayContentTitle}
          addLink='/customers/add'
        />
      </section>

      {displayComponent}
    </>
  )
}

export default CustomersPage
