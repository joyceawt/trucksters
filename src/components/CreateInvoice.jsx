import { useEffect, useState } from 'react'
import { Form, Button, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { SelectDropdown } from '.'
import { allCustomers } from '../pages/CustomersPage'
import { allInventory } from '../pages/InventoryPage'
import { buildCapacity } from '../components/InventoryList'

const CreateInvoice = ({ onCreateInvoice, completeUnitsInStock }) => {
  const [customers, setCustomers] = useState([])
  const [customerId, setCustomerId] = useState('')
  const [quantity, setQuantity] = useState('')
  const [completeToysInStock, setCompleteToysInStock] = useState('')
  const [inventoryItems, setInventoryItems] = useState([])

  const [validated, setValidated] = useState(false)

  const fetchInventory = async () => {
    try {
      const { inventory, complete_toys_in_stock } = await allInventory()

      setCompleteToysInStock(complete_toys_in_stock)
      setInventoryItems(inventory)
    } catch (err) {
      console.error(err)
    }
  }

  const fetchCustomers = async () => {
    try {
      const { data } = await allCustomers()

      setCustomers(data)
      setCustomerId(data[0]._id)
    } catch (err) {
      console.error(err)
    }
  }

  const handleCustomerSelection = (customerId) => {
    setCustomerId(customerId)
  }

  const navigate = useNavigate()

  const newInvoice = {
    customerId,
    quantity,
  }

  const handleSubmit = async (e) => {
    const form = e.currentTarget

    e.preventDefault()
    setValidated(true)

    if (quantity <= 0) {
      alert('Quantity must be a positive number.')
      return
    }

    if (quantity > completeUnitsInStock + getBuildCapacity()) {
      alert(
        'Quantity exceeds available units in stock and number of units that can be built. Please enter a valid quantity.'
      )
      return
    }

    if (form.checkValidity() === false) {
      e.stopPropagation()
    } else {
      const success = await onCreateInvoice(newInvoice)
      if (success) {
        navigate('/invoices')
      }
    }
  }

  const getBuildCapacity = () => {
    if (!inventoryItems) {
      return 0
    }
    return buildCapacity(inventoryItems)
  }

  useEffect(() => {
    fetchCustomers()
    fetchInventory()
  }, [])

  return (
    <>
      <Form
        className=''
        id='AddInvoiceForm'
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <Row className='mb-3'>
          <Form.Group controlId='selectCustomerInvoice'>
            <Form.Label className='col-form-label'>Customer:</Form.Label>
            <SelectDropdown
              className={'form-select mb-3 bg-transparent'}
              ariaLabel={'customer_id'}
              onChangeHandler={handleCustomerSelection}
              id={'selectInvoiceCustomer'}
              name={'customer_id'}
              selectOptions={customers}
              optionValue={'_id'}
              optionDisplay={'company_name'}
              selectedOption={customerId ? customerId : null}
            ></SelectDropdown>
          </Form.Group>
        </Row>
        <Row className='mb-3'>
          <Form.Group controlId='add-invoice-qty'>
            <Form.Label className='col-form-label'>
              Number of Units to Invoice:
            </Form.Label>
            <Form.Control
              type='number'
              className='bg-transparent'
              placeholder='0'
              onChange={(e) => setQuantity(e.target.value)}
              value={quantity}
              required
            />
            <Form.Control.Feedback type='invalid'>
              Please provide a valid quantity.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className='mb-3'>
          <p>Number of Units in Stock: {completeToysInStock}</p>
          <p>
            Total Units that can be built from current parts:{' '}
            {getBuildCapacity()}{' '}
          </p>
          <p>
            <i>
              *Note that more toys will be built automatically if number of
              units invoiced is exceeds number of units in stock but is within
              the build threshold.{' '}
            </i>
          </p>
        </Row>
        <Button as={Link} variant='secondary' to='/invoices'>
          Cancel
        </Button>{' '}
        <Button type='submit' variant='primary'>
          {' '}
          Create Invoice{' '}
        </Button>
      </Form>
    </>
  )
}

export default CreateInvoice
