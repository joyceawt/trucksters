import { formatAmount } from '../utils/utils'

const PayrollList = ({ selectedEmployee, payrollHistory }) => {
  console.log(selectedEmployee)
  const payrollWithholding = (payroll) => {
    return formatAmount(
      payroll.federal_tax_withheld +
        payroll.state_tax_withheld +
        payroll.social_security_tax +
        payroll.medicare_tax
    )
  }

  const totalDisbursement = payrollHistory
    .reduce((acc, payroll) => acc + (payroll.amount_paid || 0), 0)
    .toFixed(2)

  const totalWithholdings = payrollHistory.reduce((acc, payroll) => {
    return formatAmount(
      acc +
        payroll.federal_tax_withheld +
        payroll.state_tax_withheld +
        payroll.social_security_tax +
        payroll.medicare_tax
    )
  }, 0)

  return (
    <section className='d-flex flex-column justify-content-evenly custom-size'>
      <article
        className='d-flex flex-column align-content-center justify-content-center rounded p-1'
        id='content-1'
      >
        <div className='row p-4 '>
          <div className='col-sm-6 p-3'>
            <div className='card text-center bg-pink'>
              <div className='card-body '>
                <h5 className='card-title'>Total Dispursement</h5>
                <p className='card-text'>${totalDisbursement}</p>
              </div>
            </div>
          </div>

          <div className='col-sm-6 p-3'>
            <div className='card text-center bg-pink'>
              <div className='card-body'>
                <h5 className='card-title'>Total Withholding</h5>
                <p className='card-text'>${totalWithholdings} </p>
              </div>
            </div>
          </div>
        </div>
      </article>

      <article className='card table-responsive bg-white'>
        <table className='table table-striped table-hover'>
          <caption></caption>
          <thead className='thead-dark'>
            <tr>
              <th>Date Paid</th>
              <th>Dispursement</th>
              <th>Withholding</th>
            </tr>
          </thead>
          <tbody className='table-group-divider'>
            {payrollHistory.map((payroll, i) => (
              <tr key={i}>
                <td>{new Date(payroll.date_paid).toLocaleDateString()}</td>
                <td>{formatAmount(payroll.amount_paid)}</td>
                <td>{payrollWithholding(payroll)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>

      <article className='card table-responsive bg-white'>
        <table className='table table-striped table-hover'>
          <caption></caption>
          <thead className='thead-dark'>
            <tr>
              <th>Monthly Salary</th>
              <th>Bounce</th>
              <th>Federal Tax Withheld</th>
              <th>State Tax Withheld</th>
              <th>Social Security</th>
              <th>Medicare</th>
              <th>Amount Paid</th>
            </tr>
          </thead>
          <tbody className='table-group-divider'>
            {payrollHistory.map((payroll, i) => (
              <tr key={i}>
                <td>{formatAmount(selectedEmployee.salary / 12)}</td>
                <td>{payroll.bounce}</td>
                <td>{formatAmount(payroll.federal_tax_withheld)}</td>
                <td>{formatAmount(payroll.state_tax_withheld)}</td>
                <td>{formatAmount(payroll.social_security_tax)}</td>
                <td>{formatAmount(payroll.medicare_tax)}</td>
                <td>{formatAmount(payroll.amount_paid)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </section>
  )
}

export default PayrollList
