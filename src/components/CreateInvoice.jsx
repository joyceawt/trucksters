import { useEffect, useState } from 'react'
import { Form, Button, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { SelectDropdown } from '.'
import { allCustomers } from '../pages/CustomersPage'

const CreateInvoice = ({ onCreateInvoice, completeUnitsInStock }) => {
  const [customers, setCustomers] = useState([])
  const [customerId, setCustomerId] = useState('')
  const [quantity, setQuantity] = useState('')

  const [validated, setValidated] = useState(false)

  const fetchCustomers = async () => {
    try {
      const { data } = await allCustomers()

      setCustomers(data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleCustomerSelection = (e) => {
    const customerId = e.target.value
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

    if (form.checkValidity() === false) {
      e.stopPropagation()
    } else {
      const success = await onCreateInvoice(newInvoice)
      if (success) {
        navigate('/invoices')
      }
    }
  }

  useEffect(() => {
    fetchCustomers()
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
              ariaLabel={'employee_id'}
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
          <p>Number of Units in Stock: {completeUnitsInStock}</p>
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
