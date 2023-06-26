import { api } from '@/lib/api'
import Cookies from 'js-cookie'

export async function updateVehicle(
  id: string,
  exit: Date,
  totalTime: number,
  totalSpent: number,
  finalPrice: number,
  changeValue: number,
) {
  try {
    const token = Cookies.get('token')

    await api.put(
      `/vehicles/${id}`,
      {
        exit,
        totalTime,
        totalSpent,
        amountPaid: finalPrice,
        change: changeValue,
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
