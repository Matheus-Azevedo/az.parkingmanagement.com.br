import { api } from '@/lib/api'
import Cookies from 'js-cookie'

export async function deleteVehicle(id: string) {
  try {
    const token = Cookies.get('token')

    await api.delete(`/vehicles/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  } catch (error) {
    console.error(error)
  }
}
