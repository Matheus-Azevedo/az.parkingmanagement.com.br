import Cookies from 'js-cookie'
import { FormEvent } from 'react'
import { api } from '@/lib/api'

export async function registerForm(event: FormEvent<HTMLFormElement>) {
  try {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const { data } = await api.post('/register', {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      role: formData.get('role') as string,
    })

    const { token } = data

    Cookies.set('token', token)
  } catch (error) {
    // Tratar o erro, se necessário
    console.error(error)
  }
}
