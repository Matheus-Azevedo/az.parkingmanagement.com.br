import Cookies from 'js-cookie'
import { FormEvent } from 'react'
import { api } from '@/lib/api'

export async function registerForm(event: FormEvent<HTMLFormElement>) {
  try {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const { data } = await api.post('/register', {
      name: formData.get('name_field') as string,
      email: formData.get('email_field') as string,
      password: formData.get('password_field') as string,
      role: formData.get('role_field') as string,
    })

    const { token } = data

    Cookies.set('token', token)
  } catch (error) {
    console.error(error)
  }
}
