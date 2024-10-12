const PayrollList = ({ selectedEmployee, payrollHistory }) => {
  const payrollWithholding = (payroll) => {
    return (
      payroll.federal_tax_withheld +
      payroll.state_tax_withheld +
      payroll.social_security_tax +
      payroll.medicare_tax
    ).toFixed(2)
  }

  const totalDisbursement = payrollHistory
    .reduce((acc, payroll) => acc + (selectedEmployee?.salary || 0), 0)
    .toFixed(2)

  const totalWithholdings = payrollHistory
    .reduce((acc, payroll) => {
      return (
        acc +
        payroll.federal_tax_withheld +
        payroll.state_tax_withheld +
        payroll.social_security_tax +
        payroll.medicare_tax
      )
    }, 0)
    .toFixed(2)

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
              <tr key={i} payroll>
                <td>{new Date(payroll.date_paid).toLocaleDateString()}</td>
                <td>{selectedEmployee.salary.toFixed(2)}</td>
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
              <th>Salary</th>
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
                <td>{selectedEmployee.salary.toFixed(2)}</td>
                <td>{payroll.bounce.toFixed(2)}</td>
                <td>{payroll.federal_tax_withheld.toFixed(2)}</td>
                <td>{payroll.state_tax_withheld.toFixed(2)}</td>
                <td>{payroll.social_security_tax.toFixed(2)}</td>
                <td>{payroll.medicare_tax.toFixed(2)}</td>
                <td>{payroll.amount_paid.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </section>
  )
}

export default PayrollList
