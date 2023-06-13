import { iCurrency } from '@/interfaces/currency'
import { api } from '@/lib/api'
import Cookies from 'js-cookie'

export async function getCurrencyStock() {
  try {
    const token = Cookies.get('token')

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

    const formattedTotalCurrencies = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(totalCurrencies)

    return { currencies, formattedTotalCurrencies }
  } catch (error) {
    console.error(error)
  }
}
