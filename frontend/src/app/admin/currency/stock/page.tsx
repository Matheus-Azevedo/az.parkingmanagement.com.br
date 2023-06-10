import { YouAreNotLogged } from '@/components/YouAreNotLogged'
import { getCurrencyStock } from '@/functions/getCurrencyStock'

export default async function StockCurrencies() {
  const data = await getCurrencyStock()

  if (!data) {
    return <YouAreNotLogged />
  }

  const { currencies, formattedCurrencies } = data
  return (
    <main className="flex flex-col items-center justify-center">
      <h2 className="text-4xl font-bold">Currency Stock</h2>
      <h3 className="text-2xl font-bold">Total: {formattedCurrencies}</h3>
      <div className="h-4" />
      <div className="flex flex-wrap justify-center">
        {currencies.map((currency) => (
          <div
            key={currency.id}
            className="flex flex-col items-center justify-center rounded-lg border-2 border-gray-500 p-6"
          >
            <h2>{currency.value}</h2>
            <p>Type: {currency.type}</p>
            <p>Origin: {currency.origin}</p>
            <p>Quantity: {currency.quantity}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
