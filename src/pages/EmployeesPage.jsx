import { useEffect, useState } from 'react'
import axios from 'axios'
import { EmployeesList, UtilityBar, AddEmployee } from '../components'

const EMPLOYEES_PATH = 'http://localhost:4000/api/employees'

export const allEmployees = async () => {
  return await axios.get(EMPLOYEES_PATH)
}

export const EmployeesPage = ({ addEmployee }) => {
  const [employees, setEmployees] = useState([])

  const fetchEmployees = async () => {
    try {
      const { data } = await allEmployees()

      setEmployees(data)
    } catch (err) {
      console.error(err)
    }
  }

  const onAddEmployee = async (employee) => {
    try {
      const { data } = await axios.post(EMPLOYEES_PATH, employee)

      setEmployees([...employees, data])
      return true
    } catch (err) {
      if (err && err.response && err.response.data) {
        alert(`Error: ${err.response.data.message}`)
      } else {
        alert('Error: Something went wrong. Please try again.')
      }
    }
    return false
  }

  useEffect(() => {
    fetchEmployees()
  }, [])

  const displayContentTitle = addEmployee ? 'Add Employee' : 'Employees'

  const displayComponent = addEmployee ? (
    <AddEmployee onAddEmployee={onAddEmployee} />
  ) : (
    <EmployeesList employees={employees} />
  )

  return (
    <>
      <section>
        <UtilityBar
          contentTitle={displayContentTitle}
          addLink='/employees/add'
        />
      </section>

      {displayComponent}
    </>
  )
}

export default EmployeesPage
