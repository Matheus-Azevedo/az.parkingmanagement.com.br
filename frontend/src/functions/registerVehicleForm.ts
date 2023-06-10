import { api } from '@/lib/api'
import Cookies from 'js-cookie'
import { FormEvent } from 'react'

export async function registerVehicleForm(event: FormEvent<HTMLFormElement>) {
  try {
    event.preventDefault()
    const token = Cookies.get('token')

    const formData = new FormData(event.currentTarget)

    await api.post(
      '/vehicles',
      {
        plaque: formData.get('plaque_field'),
        model: formData.get('model_field'),
        email: formData.get('email_field'),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
  } catch (error) {
    alert(`Erro: ${error}`)
  }
}
