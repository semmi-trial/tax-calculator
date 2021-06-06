/**
 * Find a maximum taxable value from each category
 * based on how much income user already paid the tax
 *
 * Ex:
 *
 * 1.
 * incomeLeft = 60_000_000
 * treshold + 50_000_000 => indicating the maximum value of 5% taxable value
 * yearlyIncome = 60_000_000
 *
 * First we will find the income that hasn't user paid with formula yearlyIncome - incomeLeft
 *
 * calculatedIncome => 60_000_000 - 60_000_000 => 0
 *
 * Since the calculatedIncome is greater than the treshold,
 * we will count the maximum value with formula Treshold - calculatedIncome
 *
 * taxable amount => 50_000_000 - 0 => 50_000_000
 *
 *
 * 2.
 *  incomeLeft: 10_000_000
 *  treshold: 250_000_000
 *  yearlyIncome: 60_000_000
 *
 *  calculatedIncome = 60_000_000 - 10_000_000 => 50_000_000
 *
 * Since the calculatedIncome is less than the treshold, than we will use formula
 *
 * yearlyIncome - calculatedIncome
 *
 * then the taxable amount is = 60_000_000 - 50_000_000 => 10_000_000
 *
 *
 * @param {Number} incomeLeft amount of money from user that need to calculate the tax amount
 * @param {Number} treshold maximum value for each category of taxable table
 * @param {Number} yearlyIncome amout of yearly income from a user
 * @returns Number amount of value user should pay in each taxable category
 */
function taxableAmount(incomeLeft, treshold, yearlyIncome) {
  let calculatedIncome = yearlyIncome - incomeLeft
  if (incomeLeft >= treshold) {
    return treshold - calculatedIncome
  }

  return yearlyIncome - calculatedIncome
}

/**
 * Find the annual tax value user need to buy based on tax progressive rule stated on the challenge
 *
 *
 * @param {Number} yearlyIncome amount of yearlyIncome of user
 * @returns Numbera amount user need to pay the tax this year
 */

function findAnnualTax(yearlyIncome) {
  // const yearlyIncome = income * 12
  if (typeof yearlyIncome === 'string') {
    return 'Invalid yearly income'
  }
  let result = 0
  let calculatedIncome = 0
  let index = 0
  const taxTable = [
    {
      maxAmount: 50_000_000,
      percentage: 0.05
    },
    {
      maxAmount: 250_000_000,
      percentage: 0.15
    },
    {
      maxAmount: 500_000_000,
      percentage: 0.25
    },
    {
      maxAmount: Number.POSITIVE_INFINITY,
      percentage: 0.3
    }
  ]

  while (yearlyIncome !== calculatedIncome) {
    let incomeLeft = yearlyIncome - calculatedIncome

    let {maxAmount, percentage} = taxTable[index]

    if (calculatedIncome < maxAmount) {
      let amount = taxableAmount(incomeLeft, maxAmount, yearlyIncome)
      calculatedIncome += amount
      result += amount * percentage
    }

    index++
  }

  return result
}

/**
 * Find a taxRelief based on user marital status and dependant
 *
 *
 * @param {String} code taxRelief Code
 * @param {Number} income amount of monthly income from user
 * @returns Number | String
 */
function taxRelief(code, income) {
  const yearlyIncome = income * 12
  const taxReliefTable = {
    TK0: 54_000_000,
    K0: 58_500_000,
    K1: 63_000_000,
    K2: 67_500_000,
    K3: 72_000_000
  }

  if (!taxReliefTable[code]) {
    return 'Invalid tax relief code'
  }

  return Math.abs(yearlyIncome - taxReliefTable[code])
}

module.exports = {
  taxableAmount,
  findAnnualTax,
  taxRelief
}
