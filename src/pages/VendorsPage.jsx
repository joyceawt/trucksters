import { useEffect, useState } from 'react'
import axios from 'axios'
import { VendorsList, UtilityBar, AddVendor } from '../components'

const VENDORS_PATH = 'http://localhost:4000/api/vendors'

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
    } catch (err) {
      if (err && err.response && err.response.data) {
        alert(`Error: ${err.response.data.message}`)
      } else {
        alert('Error: Something went wrong. Please try again.')
      }
    }
  }

  useEffect(() => {
    fetchVendors()
  }, [])

  const displayComponent = addVendor ? (
    <AddVendor onAddVendor={onAddVendor} />
  ) : (
    <VendorsList vendors={vendors} />
  )

  return (
    <>
      <section>
        <UtilityBar contentTitle='Vendors' addLink='/vendors/add' />
      </section>

      {displayComponent}
    </>
  )
}

export default VendorsPage
