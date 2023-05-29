import { cookies } from 'next/headers'
import { api } from '@/lib/api'
import { iVehicle } from '@/interfaces/vehicle'
import dayjs from 'dayjs'
import jwtDecode from 'jwt-decode'
import { iToken } from '@/interfaces/token'
import { iCurrency } from '@/interfaces/currency'
import Link from 'next/link'

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
  const { name, role } = decryptedToken

  if (role !== 'admin') {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-4xl font-bold">You are not logged in!</h1>
      </div>
    )
  }

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

  const totalCurrency = currency.reduce((acc, curr) => {
    if (curr.type === 'COIN') {
      acc = acc + curr.value * 0.01 * curr.quantity
    } else {
      acc = acc + curr.value * 1 * curr.quantity
    }
    return acc
  }, 0)

  const formattedCurrency = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(totalCurrency)
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Welcome admin, {name}!</h1>
      <div className="h-4" />
      <div className="flex flex-col items-center justify-center">
        <Link
          href="/admin/vehicle"
          className="btn btn-block btn-primary btn-block mb-4 rounded-full bg-gray-500 px-5 py-3 hover:bg-gray-400"
        >
          Register Vehicle
        </Link>
        <div className="w-4" />
        <Link
          href="/admin/currency"
          className="btn btn-block btn-primary btn-block mb-4 rounded-full bg-gray-500 px-5 py-3 hover:bg-gray-400"
        >
          Update Currency Stock
        </Link>
      </div>
      <div className="h-4" />
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
            <p>
              {vehicle.exit && dayjs(vehicle.exit).format('DD/MM/YYYY HH:mm')}
            </p>
            <p>{vehicle.totalSpent}</p>
            <p>{vehicle.AmountPaid}</p>
          </div>
        ))}
      </div>
      <div className="h-4" />
      <h2 className="text-4xl font-bold">Currency Stock</h2>
      <h3 className="text-2xl font-bold">Total: {formattedCurrency}</h3>
      <div className="flex flex-wrap justify-center">
        {currency.map((currency) => (
          <div
            key={currency.id}
            className="flex flex-col items-center justify-center rounded-lg border-2 border-gray-500 p-6"
          >
            <h2>{currency.name}</h2>
            <p>Quantity: {currency.quantity}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
