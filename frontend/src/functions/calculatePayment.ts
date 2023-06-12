import { iCurrency } from '@/interfaces/currency'
import { api } from '@/lib/api'
import Cookies from 'js-cookie'
import { calculateBankNotesAndCoins } from './calculateBankNotesAndCoins'

export async function calculatePayment(values: string[], totalSpent: number) {
  try {
    const token = Cookies.get('token')

    const response = await api.get('/currency', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const currencies: iCurrency[] = response.data

    for (const currency of currencies) {
      for (const value of values) {
        if (currency.value === value) {
          await api.put(
            `/currency/${currency.id}`,
            {
              quantity: 1,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )
        }
      }
    }

    const sumValues = values.reduce((acc, value) => acc + Number(value), 0)
    const changeValue = sumValues - totalSpent

    if (changeValue === 0) {
      return { message: 'Sem troco' }
    }
    const arrayOfChange = calculateBankNotesAndCoins(changeValue)

    const valueWithoutChange = []
    for (const currency of currencies) {
      for (const value of arrayOfChange) {
        if (currency.value === String(value)) {
          if (currency.quantity === 0) {
            valueWithoutChange.push(value)
          } else {
            await api.put(
              `/currency/${currency.id}`,
              {
                quantity: -1,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              },
            )
          }
        }
      }
    }

    const credit = valueWithoutChange.reduce(
      (acc, value) => acc + Number(value),
      0,
    )

    await api.put(
      '/user',
      { credit },
      { headers: { Authorization: `Bearer ${token}` } },
    )
  } catch (error) {
    console.error(error)
  }
}
