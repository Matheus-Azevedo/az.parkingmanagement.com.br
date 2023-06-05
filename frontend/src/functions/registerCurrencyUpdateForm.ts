import { iCurrency } from '@/interfaces/currency'
import { api } from '@/lib/api'
import Cookies from 'js-cookie'
import { FormEvent } from 'react'

export async function registerCurrencyUpdateForm(
  event: FormEvent<HTMLFormElement>,
) {
  try {
    event.preventDefault()
    const token = Cookies.get('token')

    const formData = new FormData(event.currentTarget)

    const response = await api.get('/currency', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const currencies: iCurrency[] = response.data

    const currency = currencies.find(
      (curr) => curr.name === formData.get('role'),
    )

    const id = currency?.id

    await api.put(
      `/currency/${id}`,
      {
        quantity: Number(formData.get('quantity')),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
  } catch (error) {
    console.log(error)
  }
}
