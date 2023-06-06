import { iCurrency } from '@/interfaces/currency'
import { api } from '@/lib/api'
import { cookies } from 'next/headers'

export async function getCurrencyStock() {
  try {
    const token = cookies().get('token')?.value

    if (!token) {
      return null
    }

    const response2 = await api.get('/currency', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const currencies: iCurrency[] = response2.data

    const totalCurrencies = currencies.reduce((acc, curr) => {
      if (curr.type === 'COIN') {
        acc = acc + curr.value * 0.01 * curr.quantity
      } else {
        acc = acc + curr.value * 1 * curr.quantity
      }
      return acc
    }, 0)

    const formattedCurrencies = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(totalCurrencies)

    return { currencies, formattedCurrencies }
  } catch (error) {
    console.log(error)
  }
}
