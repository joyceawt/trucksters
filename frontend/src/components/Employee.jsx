const Employee = ({ employee }) => {
  return (
    <tr>
      <td>{employee.first_name}</td>
      <td>{employee.last_name}</td>
      <td>{employee.address_1}</td>
      <td>{employee.address_2}</td>
      <td>{employee.city}</td>
      <td>{employee.state}</td>
      <td>{employee.zip}</td>
      <td>{employee.ssn}</td>
      <td>{employee.withholdings}</td>
      <td>{employee.salary}</td>
    </tr>
  )
}

export default Employee
