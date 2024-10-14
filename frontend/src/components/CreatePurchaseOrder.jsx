import { useEffect, useState } from 'react'
import { Form, Button, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { SelectDropdown } from '.'
import { allInventory } from '../pages/InventoryPage'

const CreatePurchaseOrder = ({ onCreatePo }) => {
  const [parts, setParts] = useState([])
  const [selectedPartId, setSelectedPartId] = useState('')
  const [quantity, setQuantity] = useState('')

  const [validated, setValidated] = useState(false)

  const fetchParts = async () => {
    try {
      const data = await allInventory()
      const { inventory } = data
      const allParts = inventory.map((part) => {
        return {
          _id: part._id,
          part_name: part.part,
        }
      })

      setParts(allParts)
      setSelectedPartId(allParts[0]._id)
    } catch (err) {
      console.error(err)
    }
  }

  const handlePartSelection = (partId) => {
    setSelectedPartId(partId)
  }

  const navigate = useNavigate()

  const newPO = {
    partId: selectedPartId,
    quantity,
  }

  const handleSubmit = async (e) => {
    const form = e.currentTarget

    e.preventDefault()
    setValidated(true)

    if (form.checkValidity() === false) {
      e.stopPropagation()
    } else {
      const success = await onCreatePo(newPO)
      if (success) {
        navigate('/po')
      }
    }
  }

  useEffect(() => {
    fetchParts()
  }, [])

  return (
    <>
      <Form
        className=''
        id='CreatePOForm'
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <Row className='mb-3'>
          <Form.Group controlId='selectPartsPO'>
            <Form.Label className='col-form-label'>Part:</Form.Label>
            <SelectDropdown
              className={'form-select mb-3 bg-transparent'}
              ariaLabel={'part_id'}
              onChangeHandler={handlePartSelection}
              id={'selectPartsPO'}
              name={'part_id'}
              selectOptions={parts}
              optionValue={'_id'}
              optionDisplay={'part_name'}
              selectedOption={selectedPartId ? selectedPartId : null}
            ></SelectDropdown>
          </Form.Group>
        </Row>
        <Row className='mb-3'>
          <Form.Group controlId='create-po-qty'>
            <Form.Label className='col-form-label'>Quantity:</Form.Label>
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
        <Button as={Link} variant='secondary' to='/po'>
          Cancel
        </Button>{' '}
        <Button type='submit' variant='primary'>
          {' '}
          Create PO{' '}
        </Button>
      </Form>
    </>
  )
}

export default CreatePurchaseOrder
