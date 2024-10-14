import { useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

const AddCustomer = ({ onAddCustomer }) => {
  const [companyName, setCompanyName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zip, setZip] = useState('')

  const [validated, setValidated] = useState(false)

  const newCustomer = {
    companyName,
    firstName,
    lastName,
    address1,
    address2,
    city,
    state,
    zip,
  }

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    const form = e.currentTarget

    e.preventDefault()
    setValidated(true)

    if (form.checkValidity() === false) {
      e.stopPropagation()
    } else {
      const success = await onAddCustomer(newCustomer)
      if (success) {
        navigate('/customers')
      }
    }
  }

  return (
    <>
      <Form
        className=''
        id='addCustomerForm'
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <Row className='mb-3'>
          <Form.Group as={Col} md='4' controlId='add-company-name'>
            <Form.Label className='col-form-label'>Company Name:</Form.Label>
            <Form.Control
              type='text'
              placeholder='First Name'
              className='bg-transparent'
              onChange={(e) => setCompanyName(e.target.value)}
              value={companyName}
              autoFocus
              required
            />
            <Form.Control.Feedback type='invalid'>
              Please provide a valid company name.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md='4' controlId='add-cust-first-name'>
            <Form.Label className='col-form-label'>First Name:</Form.Label>
            <Form.Control
              type='text'
              placeholder='First Name'
              className='bg-transparent'
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              autoFocus
              required
            />
            <Form.Control.Feedback type='invalid'>
              Please provide a valid first name.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md='4' controlId='add-cust-last-name'>
            <Form.Label className='col-form-label'>Last Name:</Form.Label>
            <Form.Control
              type='text'
              placeholder='Last Name'
              className='bg-transparent'
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              required
            />
            <Form.Control.Feedback type='invalid'>
              Please provide a valid last name.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className='mb-3'>
          <Form.Group controlId='add-cust-address-1'>
            <Form.Label className='col-form-label'>Address 1:</Form.Label>
            <Form.Control
              type='text'
              className='bg-transparent'
              placeholder='Address 1'
              onChange={(e) => setAddress1(e.target.value)}
              value={address1}
              required
            />
            <Form.Control.Feedback type='invalid'>
              Please provide a valid address.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className='mb-3'>
          <Form.Group controlId='add-cust-address-2'>
            <Form.Label className='col-form-label'>Address 2:</Form.Label>
            <Form.Control
              type='text'
              className='bg-transparent'
              placeholder='Address 2'
              onChange={(e) => setAddress2(e.target.value)}
              value={address2}
            />
          </Form.Group>
        </Row>
        <Row className='mb-3'>
          <Form.Group as={Col} md='4' controlId='add-cust-city'>
            <Form.Label className='col-form-label'>City:</Form.Label>
            <Form.Control
              type='text'
              placeholder='City'
              className='bg-transparent'
              onChange={(e) => setCity(e.target.value)}
              value={city}
              required
            />
            <Form.Control.Feedback type='invalid'>
              Please provide a valid city.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md='4' controlId='add-cust-state'>
            <Form.Label className='col-form-label'>State:</Form.Label>
            <Form.Control
              type='text'
              placeholder='State'
              className='bg-transparent'
              onChange={(e) => setState(e.target.value)}
              value={state}
              required
            />
            <Form.Control.Feedback type='invalid'>
              Please provide a valid state.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md='4' controlId='add-cust-zip'>
            <Form.Label className='col-form-label'>Zip Code:</Form.Label>
            <Form.Control
              type='number'
              placeholder='Zip Code'
              className='bg-transparent'
              onChange={(e) => setZip(e.target.value)}
              value={zip}
              required
            />
            <Form.Control.Feedback type='invalid'>
              Please provide a valid zip code.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Button as={Link} variant='secondary' to='/customers'>
          Cancel
        </Button>{' '}
        <Button type='submit' variant='primary'>
          {' '}
          Add{' '}
        </Button>
      </Form>
    </>
  )
}

export default AddCustomer
