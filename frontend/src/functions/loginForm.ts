import { iToken } from '@/interfaces/token'
import { api } from '@/lib/api'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
import { FormEvent } from 'react'

export async function loginForm(event: FormEvent<HTMLFormElement>) {
  try {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const { data } = await api.post('/login', {
      email: formData.get('email_field'),
      password: formData.get('password_field'),
    })

    const { token } = data

    Cookies.set('token', token)

    const decryptedToken: iToken = jwtDecode(token)
    const { role } = decryptedToken
    return role
  } catch (error) {
    alert(`Erro: ${error}`)
  }
}
