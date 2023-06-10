const currencyBRL = [
  { value: 100, type: 'bank-notes' },
  { value: 50, type: 'bank-notes' },
  { value: 20, type: 'bank-notes' },
  { value: 10, type: 'bank-notes' },
  { value: 5, type: 'bank-notes' },
  { value: 2, type: 'bank-notes' },
  { value: 1, type: 'bank-notes' },
  { value: 0.5, type: 'coin' },
  { value: 0.25, type: 'coin' },
  { value: 0.1, type: 'coin' },
  { value: 0.05, type: 'coin' },
  { value: 0.01, type: 'coin' },
]

export function calculateBankNotesAndCoins(value: number) {
  const result = []

  for (const currency of currencyBRL) {
    if (value >= currency.value) {
      result.push(currency.value)
      value %= currency.value
    }
  }

  return result
}
