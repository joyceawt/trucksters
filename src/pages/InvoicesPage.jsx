import { useEffect, useState } from 'react'
import axios from 'axios'
import { InvoicesList, UtilityBar, CreateInvoice } from '../components'

const INVOICE_PATH = 'http://localhost:4000/api/invoices'

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

  const onCreateInvoice = async (invoice) => {
    try {
      const { data } = await axios.post(INVOICE_PATH, invoice)

      setInvoices([...invoices, data])
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

  const displayComponent = createInvoice ? (
    <CreateInvoice onCreateInvoice={onCreateInvoice} />
  ) : (
    <InvoicesList invoices={invoices} />
  )

  return (
    <>
      <section>
        <UtilityBar
          contentTitle='Invoices History'
          addLink='/invoices/create'
        />
      </section>

      {displayComponent}
    </>
  )
}

export default InvoicesPage
