import { useEffect, useState } from 'react'
import axios from 'axios'
import { InvoicesList, UtilityBar, CreateInvoice } from '../components'

const INVOICE_PATH = `${process.env.REACT_APP_MONGO_BASE_URL}/invoices`

const allInvoices = async () => {
  return await axios.get(INVOICE_PATH)
}

export const InvoicesPage = ({ createInvoice }) => {
  const [invoices, setInvoices] = useState([])

  const fetchInvoices = async () => {
    try {
      const { data } = await allInvoices()

      setInvoices(data)
    } catch (err) {
      console.error(err)
    }
  }

  const onCreateInvoice = async (newInvoice) => {
    try {
      const { data } = await axios.post(INVOICE_PATH, newInvoice)
      const { invoice } = data

      setInvoices([...invoices, invoice])
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
    fetchInvoices()
  }, [])

  const showAddButton = createInvoice ? false : true

  const utilityTitle = createInvoice ? 'Create Invoice' : 'Invoices History'

  const displayComponent = createInvoice ? (
    <CreateInvoice onCreateInvoice={onCreateInvoice} />
  ) : (
    <InvoicesList invoices={invoices} />
  )

  return (
    <>
      <section>
        <UtilityBar
          contentTitle={utilityTitle}
          addLink='/invoices/create'
          showButton={showAddButton}
        />
      </section>

      {displayComponent}
    </>
  )
}

export default InvoicesPage
