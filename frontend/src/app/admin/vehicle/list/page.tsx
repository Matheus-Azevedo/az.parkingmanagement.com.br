import { YouAreNotLogged } from '@/components/YouAreNotLogged'
import { getVehiclesList } from '@/functions/getVehiclesList'
import dayjs from 'dayjs'

export default async function ListVehicles() {
  const data = await getVehiclesList()

  if (!data) {
    return <YouAreNotLogged />
  }

  const { vehicles } = data
  return (
    <main className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">List of Vehicles in the Parking</h1>
      <div className="h-4" />
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
          </div>
        ))}
      </div>
    </main>
  )
}
