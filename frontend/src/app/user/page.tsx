import { cookies } from 'next/headers'
import { api } from '@/lib/api'
import { iVehicle } from '@/interfaces/vehicle'
import dayjs from 'dayjs'
import jwtDecode from 'jwt-decode'
import { iToken } from '@/interfaces/token'

export default async function User() {
  const token = cookies().get('token')?.value
  if (!token) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-4xl font-bold">You are not logged in!</h1>
      </div>
    )
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

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Welcome, {name}!</h1>
      {vehicles.map((vehicle) => (
        <div
          key={vehicle.id}
          className="flex flex-col items-center justify-center rounded-lg border-2 border-gray-500 p-24"
        >
          <h2>{vehicle.plaque}</h2>
          <p>{vehicle.model}</p>
          <p>{dayjs(vehicle.entry).format('DD/MM/YYYY HH:mm')}</p>
          <p>{vehicle.totalSpent}</p>
          <p>{vehicle.AmountPaid}</p>
        </div>
      ))}
    </main>
  )
}
