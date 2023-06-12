import { api } from '@/lib/api'
import { iVehicle } from '@/interfaces/vehicle'
import dayjs from 'dayjs'

export async function getUserData(token: string, sub: string) {
  try {
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

    const response2 = await api.get(`/user/${sub}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const user = response2.data

    let { credit } = user

    if (!credit) {
      credit = 0
    }

    let finalPrice = 0
    let creditLeft = 0
    if (credit > totalSpent) {
      creditLeft = credit - totalSpent
      finalPrice = 0
    } else if (credit === totalSpent) {
      creditLeft = 0
      finalPrice = 0
    } else {
      creditLeft = 0
      finalPrice = totalSpent - credit
    }

    return {
      vehicles,
      entry,
      exit,
      totalTime,
      totalSpent,
      credit,
      finalPrice,
      creditLeft,
    }
  } catch (error) {
    console.error(error)
  }
}
