const {taxableAmount, findAnnualTax, taxRelief} = require('../index')

describe('Annual tax value calculator', () => {
  it('should find the maximum taxable amount', () => {
    const result = taxableAmount(60_000_000, 50_000_000, 60_000_000)
    const result2 = taxableAmount(10_000_000, 250_000_000, 60_000_000)
    const result3 = taxableAmount(300_000_000, 250_000_000, 350_000_000)

    expect(result).toBe(50_000_000)
    expect(result2).toBe(10_000_000)
    expect(result3).toBe(200_000_000)
  })

  it('should find the annual tax value amount based on annual income from user', () => {
    const result = findAnnualTax(5_000_000 * 12)
    const result2 = findAnnualTax(25_000_000 * 12)

    expect(result).toBe(4_000_000)
    expect(result2).toBe(45_000_000)
  })

  it('should find the taxable income after reducing the taxRelief value based on user condition ', () => {
    const result = taxRelief('K1', 6_500_000)
    const result2 = taxRelief('TK0', 25_000_000)
    const result3 = taxRelief('unknown', 25_000_000)

    expect(result).toBe(15_000_000)
    expect(result2).toBe(246_000_000)
    expect(result3).toBe('Invalid tax relief code')
  })

  it('should generate the annual tax amount after reducing the taxRelief from user monthly income', () => {
    const result = findAnnualTax(taxRelief('K1', 6_500_000))
    const result2 = findAnnualTax(taxRelief('TK0', 25_000_000))
    const result3 = findAnnualTax(taxRelief('unknown', 25_000_000))

    expect(result).toBe(750_000)
    expect(result2).toBe(31_900_000)
    expect(result3).toBe('Invalid yearly income')
  })
})
