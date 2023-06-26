import { LinkToPage } from '@/components/LinkToPage'
import { YouAreNotLogged } from '@/components/YouAreNotLogged'
import { iToken } from '@/interfaces/token'
import { iVehicle } from '@/interfaces/vehicle'
import { api } from '@/lib/api'
import dayjs from 'dayjs'
import jwtDecode from 'jwt-decode'
import { cookies } from 'next/headers'

export default async function ListVehiclesFinished() {
  const token = cookies().get('token')?.value
  if (!token) {
    return <YouAreNotLogged />
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
    .map((vehicle: iVehicle) => {
      if (vehicle.exit !== null) {
        return vehicle
      }
      return undefined
    })
    .filter((vehicle: iVehicle) => vehicle)

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Welcome user, {name}!</h1>
      <div className="h-4" />
      <LinkToPage href="/user" btnName="Home" />
      {vehicles.length > 0 ? (
        <table className="border-collapse border-2 border-gray-500">
          <thead>
            <tr>
              <th className="border border-gray-500 p-2">Plaque</th>
              <th className="border border-gray-500 p-2">Model</th>
              <th className="border border-gray-500 p-2">Entry</th>
              <th className="border border-gray-500 p-2">Exit</th>
              <th className="border border-gray-500 p-2">Total time</th>
              <th className="border border-gray-500 p-2">Total Spent</th>
              <th className="border border-gray-500 p-2">Amount Paid</th>
              <th className="border border-gray-500 p-2">Change</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle.id}>
                <td className="border border-gray-500 p-2">{vehicle.plaque}</td>
                <td className="border border-gray-500 p-2">{vehicle.model}</td>
                <td className="border border-gray-500 p-2">
                  {dayjs(vehicle.entry).format('DD/MM/YYYY HH:mm')}
                </td>
                <td className="border border-gray-500 p-2">
                  {dayjs(vehicle.exit).format('DD/MM/YYYY HH:mm')}
                </td>
                <td className="border border-gray-500 p-2">
                  {vehicle.totalTime} h
                </td>
                <td className="border border-gray-500 p-2">
                  R$ {vehicle.totalSpent}
                </td>
                <td className="border border-gray-500 p-2">
                  R$ {vehicle.amountPaid}
                </td>
                <td className="border border-gray-500 p-2">
                  R$ {vehicle.change}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h1 className="text-4xl font-bold">No vehicles here</h1>
      )}
    </main>
  )
}
