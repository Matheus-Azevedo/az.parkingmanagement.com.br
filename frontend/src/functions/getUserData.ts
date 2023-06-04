import { api } from '@/lib/api'
import { iVehicle } from '@/interfaces/vehicle'
import dayjs from 'dayjs'
import jwtDecode from 'jwt-decode'
import { iToken } from '@/interfaces/token'
import { cookies } from 'next/headers'

export async function getUserData() {
  try {
    const token = cookies().get('token')?.value
    if (!token) {
      return null
    }

    const decryptedToken: iToken = jwtDecode(token)
    const { sub, name } = decryptedToken
    const response = await api.get('/vehicles', {
      params: {
        id: sub,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const vehicles: iVehicle[] = response.data

    const entry = dayjs(vehicles[0].entry)
    const exit = dayjs()
    const totalTime = dayjs(exit).diff(dayjs(entry), 'hour')
    const totalSpent =
      vehicles[0].model === 'CAR'
        ? Number(totalTime) * 5
        : Number(totalTime) * 2

    return { name, vehicles, entry, exit, totalTime, totalSpent }
  } catch (error) {
    console.error(error)
    return null
  }
}
