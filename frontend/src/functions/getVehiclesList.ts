import { iVehicle } from '@/interfaces/vehicle'
import { api } from '@/lib/api'
import { cookies } from 'next/headers'

export async function getVehiclesList() {
  try {
    const token = cookies().get('token')?.value

    if (!token) {
      return null
    }

    const response = await api.get('/vehicles', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const vehicles: iVehicle[] = response.data

    return { vehicles }
  } catch (error) {
    console.log(error)
  }
}
