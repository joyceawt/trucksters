import { Form } from 'react-bootstrap'

export const Select = ({
  selectOptions,
  filterSelect = null,
  setFilterText = null,
  selectedOption,
  defaultFilterValue,
  className = 'form-select bg-light',
  ariaLabel = null,
  optionValue = null,
  onChangeHandler = null,
  optionDisplay = null,
  id,
  name,
}) => {
  const handleChange = (e) => {
    if (onChangeHandler != null) {
      onChangeHandler(e.target.value)
    } else {
      setFilterText(e.target.value)
      filterSelect(e.target.value)
    }
  }

  const optionDisplayHandler = (option) => {
    if (optionDisplay) {
      if (Array.isArray(optionDisplay)) {
        return option[optionDisplay[0]] + ' ' + option[optionDisplay[1]]
      }
    } else {
      return option
    }
  }

  return (
    <div className='pe-3'>
      <Form.Select
        className={className}
        aria-label={ariaLabel}
        onChange={handleChange}
        defaultValue={selectedOption}
        placeholder={defaultFilterValue}
        name={name}
        id={id}
      >
        {defaultFilterValue ? <option>{defaultFilterValue}</option> : ''}
        {selectOptions.map((option, i) => (
          <option
            key={option._id}
            value={optionValue ? option[optionValue] : option}
          >
            {optionDisplayHandler(option)}
          </option>
        ))}
      </Form.Select>
      <Form.Control.Feedback type='invalid'>
        Please select a valid {name}.
      </Form.Control.Feedback>
    </div>
  )
}

export default Select
