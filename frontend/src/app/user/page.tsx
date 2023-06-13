import { FinishParking } from '@/components/FinishParking'
import { Logout } from '@/components/Logout'
import { YouAreNotLogged } from '@/components/YouAreNotLogged'
import { getUserData } from '@/functions/getUserData'
import { iToken } from '@/interfaces/token'
import jwtDecode from 'jwt-decode'
import { cookies } from 'next/headers'

export default async function User() {
  const token = cookies().get('token')?.value
  if (!token) {
    return <YouAreNotLogged />
  }
  const decryptedToken: iToken = jwtDecode(token)
  const { sub, name } = decryptedToken

  const userData = await getUserData(token, sub)

  if (!userData) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center space-y-4 p-24">
        <h1 className="text-4xl font-bold">Welcome user, {name}!</h1>
        <h1 className="text-4xl font-bold">You not have any vehicle parked</h1>
        <Logout />
      </main>
    )
  }

  const {
    vehicles,
    entry,
    exit,
    totalTime,
    totalSpent,
    credit,
    finalPrice,
    creditLeft,
  } = userData

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Welcome user, {name}!</h1>
      <div className="h-4" />
      <Logout />
      {vehicles.length > 0 ? (
        vehicles.map((vehicle) => (
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
            <p>Credit: R$ {credit}</p>
            <p>Final Price: R$ {finalPrice}</p>
            <div className="h-4" />
            <FinishParking
              finalPrice={finalPrice}
              creditLeft={creditLeft}
              vehicleId={vehicle.id}
            />
          </div>
        ))
      ) : (
        <h1 className="text-4xl font-bold">No vehicles parked</h1>
      )}
    </main>
  )
}
