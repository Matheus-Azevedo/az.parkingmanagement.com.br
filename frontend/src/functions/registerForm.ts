import { FormEvent } from 'react'
import { api } from '@/lib/api'

export async function registerForm(event: FormEvent<HTMLFormElement>) {
  try {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    await api.post('/user', {
      name: formData.get('name_field') as string,
      email: formData.get('email_field') as string,
      password: formData.get('password_field') as string,
      role: formData.get('role_field') as string,
    })
  } catch (error) {
    console.error(error)
  }
}
