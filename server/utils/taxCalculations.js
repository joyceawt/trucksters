// Federal Tax Data from https://www.nerdwallet.com/article/taxes/federal-income-tax-brackets#:~:text=In%202024%2C%20there%20are%20seven,annually%20to%20account%20for%20inflation.
const calculateFederalTax = (salary, filingStatus) => {
  let tax = 0

  // Single and not married
  const brackets = [
    { rate: 0.1, range: [0, 11600] },
    { rate: 0.12, range: [11601, 47150] },
    { rate: 0.22, range: [47151, 100525] },
    { rate: 0.24, range: [100526, 191950] },
    { rate: 0.32, range: [191951, 243725] },
    { rate: 0.35, range: [243726, 609350] },
    { rate: 0.37, range: [609351, Infinity] },
  ]

  for (const bracket of brackets) {
    const [min, max] = bracket.range
    if (salary > min) {
      const taxableIncome = Math.min(salary, max) - min
      tax += taxableIncome * bracket.rate
    }
  }

  return tax
}

// Calculate state tax (Illinois only for now, based on https://www.nerdwallet.com/article/taxes/state-income-tax-rates#2024%20state%20income%20tax%20rates)
const calculateStateTax = (salary, state) => {
  const stateTaxRates = {
    Illinois: 0.0495,
  }

  const taxRate = stateTaxRates[state] || stateTaxRates['Illinois'] // Default to 0 if no rate found
  return salary * taxRate
}

// Calculate Social Security and Medicare taxes (based on https://www.irs.gov/taxtopics/tc751)
const calculateFICA = (salary) => {
  const socialSecurityTax = salary <= 168600 ? salary * 0.062 : 168600 * 0.062
  const medicareTax = salary * 0.0145
  const additionalMedicareTax = salary > 200000 ? (salary - 200000) * 0.009 : 0

  return {
    socialSecurityTax,
    medicareTax,
    additionalMedicareTax,
  }
}
module.exports = { calculateFederalTax, calculateStateTax, calculateFICA }
