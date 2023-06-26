import { iVehicle } from '@/interfaces/vehicle'
import { api } from '@/lib/api'
import Cookies from 'js-cookie'

export async function getVehiclesList() {
  try {
    const token = Cookies.get('token')

    if (!token) {
      return null
    }

    const response = await api.get('/vehicles', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const vehicles: iVehicle[] = response.data
      .map((vehicle: iVehicle) => {
        if (vehicle.exit === null) {
          return vehicle
        }
        return undefined
      })
      .filter((vehicle: iVehicle) => vehicle)

    return { vehicles }
  } catch (error) {
    console.error(error)
  }
}
