import { useEffect, useState } from 'react'
import axios from 'axios'
import { IncomeStatementTable, UtilityBar, DatePicker } from '../components'
import { Row, Form, Col } from 'react-bootstrap'
import { formatDateToLocal } from '../utils/utils'

const IncomeStatementPage = () => {
  const startOfYear = new Date(new Date().getFullYear(), 0, 1)
  const [incomeStatement, setIncomeStatement] = useState(null)
  const [startDate, setStartDate] = useState(formatDateToLocal(startOfYear))
  const [endDate, setEndDate] = useState(formatDateToLocal(new Date()))
  const [expenses, setExpenses] = useState([])

  const INCOME_STATEMENT_PATH = `${process.env.REACT_APP_MONGO_BASE_URL}/income-statement`
  const EXPENSES_PATH = `${process.env.REACT_APP_MONGO_BASE_URL}/expenses`

  useEffect(() => {
    const fetchIncomeStatement = async () => {
      try {
        const { data } = await axios.get(
          `${INCOME_STATEMENT_PATH}?startDate=${startDate}&endDate=${endDate}`
        )

        setIncomeStatement(data)
      } catch (err) {
        alert('Error: could not fetch income statement data', err)
      }
    }

    const fetchExpenses = async () => {
      try {
        const { data } = await axios.get(EXPENSES_PATH)

        setExpenses(data)
      } catch (err) {
        alert('Error: could not fetch expenses data', err)
      }
    }

    fetchIncomeStatement()
    fetchExpenses()
  }, [startDate, endDate])

  const handleStartDateChange = (date) => {
    setStartDate(date)
  }

  const handleEndDateChange = (date) => {
    setEndDate(date)
  }

  const DatePickerComponent = () => {
    return (
      <Row className='mb-3'>
        <Form.Group as={Col} md='6'>
          <DatePicker
            id='income-statement-start-date'
            name='income-statement-start-date'
            label='Start Date:'
            value={startDate}
            onChangeHandler={handleStartDateChange}
          />
        </Form.Group>

        <Form.Group as={Col} md='6'>
          <DatePicker
            id='income-statement-end-date'
            name='income-statement-end-date'
            label='End Date:'
            value={endDate}
            onChangeHandler={handleEndDateChange}
          />
        </Form.Group>
      </Row>
    )
  }

  return (
    <>
      <section>
        <UtilityBar
          contentTitle='Income Statement'
          customComponent={DatePickerComponent}
          showButton={false}
        />
      </section>

      {incomeStatement ? (
        <IncomeStatementTable
          incomeStatement={incomeStatement}
          expenses={expenses}
        />
      ) : (
        <p>Loading income statement data...</p>
      )}
    </>
  )
}

export default IncomeStatementPage
