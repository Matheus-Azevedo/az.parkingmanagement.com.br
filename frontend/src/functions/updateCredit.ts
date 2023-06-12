import { iToken } from '@/interfaces/token'
import { api } from '@/lib/api'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'

export async function updateCredit(creditLeft: number) {
  try {
    const token = Cookies.get('token')
    if (!token) {
      return null
    }
    const decryptedToken: iToken = jwtDecode(token)
    const { sub } = decryptedToken

    await api.put(
      `/user/${sub}`,
      {
        credit: creditLeft,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
  } catch (error) {
    console.error(error)
  }
}
