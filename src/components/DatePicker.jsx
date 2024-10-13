import { Form } from 'react-bootstrap'

const DatePicker = ({
  label = 'Change Date:',
  id,
  value,
  name,
  onChangeHandler,
}) => {
  const handleChange = (e) => {
    onChangeHandler(e.target.value)
  }

  return (
    <>
      <Form.Label htmlFor='date'>{label}</Form.Label>
      <Form.Control
        type='date'
        id={id}
        name={name}
        aria-describedby={name}
        value={value}
        onChange={handleChange}
      />
    </>
  )
}

export default DatePicker
