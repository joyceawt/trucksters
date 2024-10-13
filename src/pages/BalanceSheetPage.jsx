import { useEffect, useState } from 'react'
import axios from 'axios'
import { BalanceSheetTable, UtilityBar } from '../components'
import { Form } from 'react-bootstrap'

const BalanceSheetPage = () => {
  const [balanceSheet, setBalanceSheet] = useState(null)
  const [balanceDate, setBalanceDate] = useState(
    new Date().toISOString().split('T')[0]
  )

  useEffect(() => {
    const fetchBalanceSheet = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/balance-sheet?date=${balanceDate}`
        )

        setBalanceSheet(data)
      } catch (err) {
        alert('Error: could not fetch balance sheet data', err)
      }
    }

    fetchBalanceSheet()
  }, [balanceDate])

  const datePicker = () => {
    return (
      <>
        <Form.Label htmlFor='date'>Change Date:</Form.Label>
        <Form.Control
          type='date'
          id='balance-date'
          name='balance-date'
          aria-describedby='balance-date'
          value={balanceDate}
          onChange={(e) => setBalanceDate(e.target.value)}
        />
      </>
    )
  }

  return (
    <>
      <section>
        <UtilityBar
          contentTitle='Balance Sheet'
          customComponent={datePicker}
          showButton={false}
        />
      </section>

      {balanceSheet ? (
        <BalanceSheetTable balanceSheet={balanceSheet} />
      ) : (
        <p>Loading balance sheet data...</p>
      )}
    </>
  )
}

export default BalanceSheetPage
