import { useEffect, useState } from 'react'
import { PayrollList, UtilityBar, SelectDropdown } from '../components'
import { allEmployees } from './EmployeesPage'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'

export const PayrollPage = () => {
  const [employees, setEmployees] = useState([])
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [payrollHistory, setPayrollHistory] = useState([])

  const PAYROLL_PROCESS_URL = `${process.env.REACT_APP_MONGO_BASE_URL}/payroll`

  const fetchEmployees = async () => {
    try {
      const { data } = await allEmployees()

      setEmployees(data)
      setSelectedEmployee(data[0])
      setPayrollHistory(data[0].payroll || [])
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchEmployees()
  }, [])

  const handleEmployeeSelection = (employeeId) => {
    const selectedEmp = employees.find(
      (employee) => employee._id === employeeId
    )
    setSelectedEmployee(selectedEmp)
    setPayrollHistory(selectedEmp.payroll || [])
  }

  const onPayEmployee = async () => {
    if (!selectedEmployee) {
      alert('Please select an employee to pay.')
      return
    }

    try {
      const { data } = await axios.post(
        `${PAYROLL_PROCESS_URL}/${selectedEmployee._id}`
      )
      const { payrollEvent } = data

      setPayrollHistory([...payrollHistory, payrollEvent])
    } catch (err) {
      if (err && err.response && err.response.data) {
        alert(`Error processing payroll: ${err.response.data.message}`)
      } else {
        alert(
          'Something went wrong trying to process the payroll. Please try again.'
        )
      }
    }
  }

  const selectEmployee = () => {
    return (
      <>
        <Form.Group className='mb-3' controlId='selectEmployeePayroll'>
          <Form.Label className='col-form-label'>Employee</Form.Label>
          <SelectDropdown
            className={'form-select mb-3 bg-transparent'}
            ariaLabel={'employee_id'}
            onChangeHandler={handleEmployeeSelection}
            id={'selectEmployeePayroll'}
            name={'employee_id'}
            selectOptions={employees}
            optionValue={'_id'}
            optionDisplay={['first_name', 'last_name']}
            selectedOption={selectedEmployee ? selectedEmployee._id : null}
          ></SelectDropdown>
        </Form.Group>
        <Button variant='primary' onClick={onPayEmployee}>
          Pay Employee
        </Button>
      </>
    )
  }

  return (
    <>
      <section>
        <UtilityBar
          contentTitle='Payroll'
          showButton={false}
          customComponent={selectEmployee}
        />
      </section>

      <PayrollList
        selectedEmployee={selectedEmployee}
        payrollHistory={payrollHistory}
        handleEmployeeSelection={handleEmployeeSelection}
      />
    </>
  )
}

export default PayrollPage
