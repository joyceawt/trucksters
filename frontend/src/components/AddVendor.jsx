import { useState } from 'react'
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

const AddVendor = ({ onAddVendor }) => {
  const [companyName, setCompanyName] = useState('')
  const [part, setPart] = useState('')
  const [pricePerUnit, setPricePerUnit] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zip, setZip] = useState('')

  const [validated, setValidated] = useState(false)

  const newVendor = {
    companyName,
    part,
    pricePerUnit,
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
      const success = await onAddVendor(newVendor)
      if (success) {
        navigate('/vendors')
      }
    }
  }

  return (
    <>
      <Form
        className=''
        id='AddVendorForm'
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <Row className='mb-3'>
          <Form.Group as={Col} md='4' controlId='add-vendors-company-name'>
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
              Please provide a valid first name.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md='4' controlId='add-vendor-part'>
            <Form.Label className='col-form-label'>Part:</Form.Label>
            <Form.Control
              type='text'
              placeholder='Part'
              className='bg-transparent'
              onChange={(e) => setPart(e.target.value)}
              value={part}
              autoFocus
              required
            />
            <Form.Control.Feedback type='invalid'>
              Please provide a valid part.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md='4' controlId='add-vendor-ppu'>
            <Form.Label className='col-form-label'>Price/Unit:</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id='ppuPrepend'>$</InputGroup.Text>
              <Form.Control
                type='number'
                className='bg-transparent'
                placeholder='$'
                aria-describedby='ppuPrepend'
                onChange={(e) => setPricePerUnit(e.target.value)}
                value={pricePerUnit}
                required
              />
              <Form.Control.Feedback type='invalid'>
                Please provide a valid price per unit.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>
        <Row className='mb-3'>
          <Form.Group controlId='add-vendor-address-1'>
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
          <Form.Group controlId='add-vendor-address-2'>
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
          <Form.Group as={Col} md='4' controlId='add-vendor-city'>
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
          <Form.Group as={Col} md='4' controlId='add-vendor-state'>
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
          <Form.Group as={Col} md='4' controlId='add-vendor-zip'>
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
        <Button as={Link} variant='secondary' to='/vendors'>
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

export default AddVendor
