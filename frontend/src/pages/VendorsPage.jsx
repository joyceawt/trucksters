import { useEffect, useState } from 'react'
import axios from 'axios'
import { VendorsList, UtilityBar, AddVendor } from '../components'

const VENDORS_PATH = `${process.env.REACT_APP_MONGO_BASE_URL}/vendors`

const allVendors = async () => {
  return await axios.get(VENDORS_PATH)
}

export const VendorsPage = ({ addVendor }) => {
  const [vendors, setVendors] = useState([])

  const fetchVendors = async () => {
    try {
      const { data } = await allVendors()

      setVendors(data)
    } catch (err) {
      console.error(err)
    }
  }

  const onAddVendor = async (vendor) => {
    try {
      const { data } = await axios.post(VENDORS_PATH, vendor)

      setVendors([...vendors, data])
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

  const displayContentTitle = addVendor ? 'Add Vendor' : 'Vendors'

  useEffect(() => {
    fetchVendors()
  }, [])

  const displayComponent = addVendor ? (
    <AddVendor onAddVendor={onAddVendor} />
  ) : (
    <VendorsList vendors={vendors} />
  )

  const showAddButton = addVendor ? false : true

  return (
    <>
      <section>
        <UtilityBar
          contentTitle={displayContentTitle}
          addLink='/vendors/add'
          showButton={showAddButton}
        />
      </section>

      {displayComponent}
    </>
  )
}

export default VendorsPage
