import { Employee } from './index'

const EmployeesList = ({ employees }) => {
  return (
    <section className='d-flex flex-column justify-content-evenly custom-size'>
      <article className='card table-responsive bg-white'>
        <table className='table table-striped table-hover'>
          <caption></caption>
          <thead className='thead-dark'>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address Line 1</th>
              <th>Address Line 2</th>
              <th>City</th>
              <th>State</th>
              <th>Zip</th>
              <th>Social Security #</th>
              <th># of Withholdings</th>
              <th>Yearly Salary</th>
            </tr>
          </thead>
          <tbody className='table-group-divider'>
            {employees.map((employee, i) => (
              <Employee key={i} employee={employee} />
            ))}
          </tbody>
        </table>
      </article>
    </section>
  )
}

export default EmployeesList
