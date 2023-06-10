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
        userId: sub,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const vehicles: iVehicle[] = response.data

    const entry = dayjs(vehicles[0].entry)
    const exit = dayjs()
    let totalTime = dayjs(exit).diff(dayjs(entry), 'hour')
    if (totalTime < 1) {
      totalTime = 1
    }

    const carValue = 5
    const motorcycleValue = 2
    const totalSpent =
      vehicles[0].model === 'CAR'
        ? Number(totalTime) * carValue
        : Number(totalTime) * motorcycleValue

    return { name, vehicles, entry, exit, totalTime, totalSpent }
  } catch (error) {
    alert(`Erro: ${error}`)
  }
}
