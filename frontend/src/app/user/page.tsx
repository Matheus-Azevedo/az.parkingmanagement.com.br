import { api } from '@/lib/api'
import { iVehicle } from '@/interfaces/vehicle'
import dayjs from 'dayjs'
import jwtDecode from 'jwt-decode'
import { iToken } from '@/interfaces/token'
import { cookies } from 'next/headers'
import { FinishParking } from '@/components/FinishParking'

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

  const entry = dayjs(vehicles[0].entry)
  const exit = dayjs()
  const totalTime = dayjs(exit).diff(dayjs(entry), 'hour')
  const totalSpent =
    vehicles[0].model === 'CAR' ? Number(totalTime) * 5 : Number(totalTime) * 2

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Welcome user, {name}!</h1>
      <div className="h-4" />
      <a
        href="/api/auth/logout"
        className="btn btn-block btn-primary btn-block mb-4 rounded-full bg-gray-500 px-5 py-3 hover:bg-gray-400"
      >
        Logout
      </a>
      {vehicles.map((vehicle) => (
        <div
          key={vehicle.id}
          className="flex flex-col items-center justify-center rounded-lg border-2 border-gray-500 p-24"
        >
          <h2>Plaque: {vehicle.plaque}</h2>
          <p>Model: {vehicle.model}</p>
          <p>Price per Hour: CAR $5 | MOTO $2</p>
          <p>Entry: {entry.format('DD/MM/YYYY HH:mm')}</p>
          <p>Exit: {exit.format('DD/MM/YYYY HH:mm')}</p>
          <p>Total time: {totalTime} h</p>
          <p>Total Spent: R$ {totalSpent}</p>
          <p>{vehicle.AmountPaid}</p>
          <div className="h-4" />
          <FinishParking props={totalSpent} />
        </div>
      ))}
    </main>
  )
}
