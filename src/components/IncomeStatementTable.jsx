import { formatAmount } from '../utils/utils'
const IncomeStatementTable = ({ incomeStatement, expenses }) => {
  const {
    sales,
    cogs,
    grossProfit,
    totalExpenses,
    payroll,
    payrollWithholding,
    incomeBeforeTax,
    incomeTaxes,
    netIncome,
  } = incomeStatement

  return (
    <section className='d-flex flex-column justify-content-evenly custom-size'>
      <article className='card table-responsive bg-white'>
        <table className='table table-striped table-hover'>
          <caption></caption>
          <thead className='thead-dark'>
            <tr>
              <th>Detail</th>
              <th>Amount</th>
              <th></th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody className='table-group-divider'>
            <tr>
              <td>Sales</td>
              <td>{formatAmount(sales)}</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Cost of Goods Sold</td>
              <td>{formatAmount(cogs)}</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>
                <strong>Gross Profit</strong>
              </td>
              <td>{formatAmount(grossProfit)}</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>
                <strong>Expenses</strong>
              </td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Payroll</td>
              <td>{formatAmount(payroll)}</td>
              <td></td>
              <td>Payroll represents gross salaries</td>
            </tr>
            <tr>
              <td>Payroll Withholding</td>
              <td>{formatAmount(payrollWithholding)}</td>
              <td></td>
              <td>Not included in total expenses as gross salaries are used</td>
            </tr>
            {expenses.map((expense, i) => (
              <tr key={i} id='fixed-expenses'>
                <td>{expense.name}</td>
                <td>{formatAmount(expense.amount)}</td>
                <td></td>
                <td></td>
              </tr>
            ))}
            <tr>
              <td>
                <strong>Total Expenses</strong>
              </td>
              <td>{formatAmount(totalExpenses)}</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Income Before Taxes</td>
              <td>{formatAmount(incomeBeforeTax)}</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Income Taxes</td>
              <td>{formatAmount(incomeTaxes)}</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>
                <strong>Net Income</strong>
              </td>
              <td>{formatAmount(netIncome)}</td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </article>
    </section>
  )
}

export default IncomeStatementTable
