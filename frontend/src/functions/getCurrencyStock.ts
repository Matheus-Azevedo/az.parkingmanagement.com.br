import { iCurrency } from '@/interfaces/currency'
import { api } from '@/lib/api'
import { cookies } from 'next/headers'

export async function getCurrencyStock() {
  try {
    const token = cookies().get('token')?.value

    if (!token) {
      return null
    }

    const response = await api.get('/currency', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const currencies: iCurrency[] = response.data

    const totalCurrencies = currencies.reduce((acc, curr) => {
      return acc + parseFloat(curr.value) * curr.quantity
    }, 0)

    const formattedCurrencies = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(totalCurrencies)

    return { currencies, formattedCurrencies }
  } catch (error) {
    console.error(error)
  }
}
