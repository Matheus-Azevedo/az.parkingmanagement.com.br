import { cookies } from 'next/headers'
import { api } from '@/lib/api'
import { iVehicle } from '@/interfaces/vehicle'
import dayjs from 'dayjs'
import jwtDecode from 'jwt-decode'
import { iToken } from '@/interfaces/token'
import { iCurrency } from '@/interfaces/currency'

export default async function Admin() {
  const token = cookies().get('token')?.value
  if (!token) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-4xl font-bold">You are not logged in!</h1>
      </div>
    )
  }

  const decryptedToken: iToken = jwtDecode(token)
  const { name } = decryptedToken
  const response = await api.get('/vehicles', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const vehicles: iVehicle[] = response.data

  const response2 = await api.get('/currency', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const currency: iCurrency[] = response2.data
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Welcome, {name}!</h1>
      <div className="h-2" />
      <h2 className="text-4xl font-bold">Vehicles</h2>
      <div className="flex flex-wrap justify-center">
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className="flex flex-col items-center justify-center rounded-lg border-2 border-gray-500 p-6"
          >
            <h2>{vehicle.plaque}</h2>
            <p>{vehicle.model}</p>
            <p>{dayjs(vehicle.entry).format('DD/MM/YYYY HH:mm')}</p>
            <p>{vehicle.totalSpent}</p>
            <p>{vehicle.AmountPaid}</p>
          </div>
        ))}
      </div>
      <div className="h-2" />
      <h2 className="text-4xl font-bold">Currency</h2>
      <div className="flex flex-wrap justify-center">
        {currency.map((currency) => (
          <div
            key={currency.id}
            className="flex flex-col items-center justify-center rounded-lg border-2 border-gray-500 p-6"
          >
            <h2>{currency.value}</h2>
            <p>{currency.type}</p>
            <p>{currency.quantity}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
