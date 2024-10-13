const BalanceSheetTable = ({ balanceSheet }) => {
  const displayAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }
  const { assets, liabilities, netWorth, totalLiabilitiesAndNetWorth } =
    balanceSheet
  const {
    cash,
    accountsReceivable,
    inventory,
    totalCurrentAssets,
    landBuilding,
    equipmentFix,
    totalFixedAssets,
    totalAssets,
  } = assets
  const {
    notesPayable,
    accountsPayable,
    accruals,
    totalCurrentLiabilities,
    mortgage,
    totalLongTermDebt,
  } = liabilities

  return (
    <section className='d-flex flex-column justify-content-evenly custom-size'>
      <p>
        <i>
          {' '}
          *Note that balance sheet will always show data for end of month
          selected
        </i>
      </p>
      <article className='card table-responsive bg-white'>
        <table className='table table-striped table-hover'>
          <caption></caption>
          <thead className='thead-dark'>
            <tr>
              <th colSpan={2}>Assets</th>
              <th colSpan={2}></th>
              <th colSpan={2}>Liabilities</th>
            </tr>
          </thead>
          <tbody className='table-group-divider'>
            <tr>
              <td>Cash</td>
              <td>{displayAmount(cash)}</td>
              <td></td>
              <td>Notes Payable</td>
              <td>{displayAmount(notesPayable)}</td>
            </tr>
            <tr>
              <td>Accounts Receivable</td>
              <td>{displayAmount(accountsReceivable)}</td>
              <td></td>
              <td>Accounts Payable</td>
              <td>{displayAmount(accountsPayable)}</td>
            </tr>
            <tr>
              <td>Inventory</td>
              <td>{displayAmount(inventory)}</td>
              <td></td>
              <td>Accruals</td>
              <td>{displayAmount(accruals)}</td>
            </tr>
            <tr>
              <td>Total Current Assets</td>
              <td>{displayAmount(totalCurrentAssets)}</td>
              <td></td>
              <td>Total Current Liabilities</td>
              <td>{displayAmount(totalCurrentLiabilities)}</td>
            </tr>
            <tr>
              <td>Land/Building</td>
              <td>{displayAmount(landBuilding)}</td>
              <td></td>
              <td>Mortgage</td>
              <td>{displayAmount(mortgage)}</td>
            </tr>
            <tr>
              <td>Equipment/Fix</td>
              <td>{displayAmount(equipmentFix)}</td>
              <td></td>
              <td>Total Long Term Debt</td>
              <td>{displayAmount(totalLongTermDebt)}</td>
            </tr>
            <tr>
              <td>Total Fixed Assets</td>
              <td>{displayAmount(totalFixedAssets)}</td>
              <td></td>
              <td>Net Worth</td>
              <td>{displayAmount(netWorth)}</td>
            </tr>
            <tr>
              <td>Total Assets</td>
              <td>{displayAmount(totalAssets)}</td>
              <td></td>
              <td>Total Liabilities & Net Worth</td>
              <td>{displayAmount(totalLiabilitiesAndNetWorth)}</td>
            </tr>
          </tbody>
        </table>
      </article>
    </section>
  )
}

export default BalanceSheetTable
