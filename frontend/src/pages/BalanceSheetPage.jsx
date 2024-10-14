import { useEffect, useState } from 'react'
import axios from 'axios'
import { BalanceSheetTable, UtilityBar, DatePicker } from '../components'
import { formatDateToLocal } from '../utils/utils'

const BalanceSheetPage = () => {
  const [balanceSheet, setBalanceSheet] = useState(null)
  const [balanceDate, setBalanceDate] = useState(formatDateToLocal(new Date()))
  console.log(process.env)
  console.log(process.env.REACT_APP_MONGO_BASE_URL)

  const BALANCE_SHEET_PATH = `${process.env.REACT_APP_MONGO_BASE_URL}/balance-sheet`

  useEffect(() => {
    const fetchBalanceSheet = async () => {
      try {
        const { data } = await axios.get(
          `${BALANCE_SHEET_PATH}?date=${balanceDate}`
        )

        setBalanceSheet(data)
      } catch (err) {
        alert('Error: could not fetch balance sheet data', err)
      }
    }

    fetchBalanceSheet()
  }, [balanceDate])

  const onChangeDate = (date) => {
    setBalanceDate(date)
  }

  const datePickerComponent = () => {
    return (
      <DatePicker
        id='balance-date'
        name='balance-date'
        label='Change Date:'
        value={balanceDate}
        onChangeHandler={onChangeDate}
      />
    )
  }

  return (
    <>
      <section>
        <UtilityBar
          contentTitle='Balance Sheet'
          customComponent={datePickerComponent}
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
