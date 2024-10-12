import { useEffect, useState } from 'react'
import { PayrollList, UtilityBar, SelectDropdown } from '../components'
import { allEmployees } from './EmployeesPage'
import { Form, Button } from 'react-bootstrap'

export const PayrollPage = ({ payEmployee }) => {
  const [employees, setEmployees] = useState([])
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [payrollHistory, setPayrollHistory] = useState([])

  const fetchEmployees = async () => {
    try {
      const { data } = await allEmployees()

      setEmployees(data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchEmployees()
  }, [])

  const handleEmployeeSelection = (e) => {
    const employeeId = e.target.value
    const selectedEmp = employees.find(
      (employee) => employee._id === employeeId
    )
    setSelectedEmployee(selectedEmp)
    setPayrollHistory(selectedEmp.payroll || [])
  }

  const onPayEmployee = async () => {}

  const selectEmployee = () => {
    return (
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
        <Button variant='primary' onClick={onPayEmployee}>
          Pay Employee
        </Button>
      </section>

      <PayrollList
        employees={employees}
        selectedEmployee={selectedEmployee}
        payrollHistory={payrollHistory}
        handleEmployeeSelection={handleEmployeeSelection}
      />
    </>
  )
}

export default PayrollPage
