import { useEffect, useState } from 'react'
import axios from 'axios'
import { EmployeesList, UtilityBar, AddEmployee } from '../components'

const EMPLOYEES_PATH = 'http://localhost:4000/api/employees'

const allEmployees = async () => {
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
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchEmployees()
  }, [])

  const displayComponent = addEmployee ? (
    <AddEmployee onAddEmployee={onAddEmployee} />
  ) : (
    <EmployeesList employees={employees} />
  )

  return (
    <>
      <section>
        <UtilityBar contentTitle='Employees' addLink='/employees/add' />
      </section>

      {displayComponent}
    </>
  )
}

export default EmployeesPage
