'use client'

import { useEffect, useState } from 'react'
import { getCurrencyStock } from '@/functions/getCurrencyStock'
import { iCurrency } from '@/interfaces/currency'

export default function StockCurrencies() {
  const [currencies, setCurrencies] = useState<iCurrency[]>([])
  const [formattedTotalCurrencies, setFormattedCurrencies] = useState('')

  useEffect(() => {
    async function updateContent() {
      const data = await getCurrencyStock()
      if (data) {
        const { currencies, formattedTotalCurrencies } = data
        setCurrencies(currencies)
        setFormattedCurrencies(formattedTotalCurrencies)
      }
    }

    updateContent()
  }, [])

  if (currencies.length === 0) {
    return (
      <main className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">You not have any vehicle parked</h1>
      </main>
    )
  }

  return (
    <main className="flex flex-col items-center justify-center">
      <h2 className="text-4xl font-bold">Currency Stock</h2>
      <h3 className="text-2xl font-bold">Total: {formattedTotalCurrencies}</h3>
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
