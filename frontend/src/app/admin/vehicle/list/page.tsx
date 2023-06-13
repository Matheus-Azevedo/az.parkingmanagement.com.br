'use client'

import { useEffect, useState } from 'react'
import { getVehiclesList } from '@/functions/getVehiclesList'
import dayjs from 'dayjs'
import { iVehicle } from '@/interfaces/vehicle'

export default function ListVehicles() {
  const [vehicles, setVehicles] = useState<iVehicle[]>([])

  useEffect(() => {
    async function updateContent() {
      const data = await getVehiclesList()
      if (data) {
        setVehicles(data.vehicles)
      }
    }

    updateContent()
  }, [])

  if (vehicles.length === 0) {
    return (
      <main className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">You not have any vehicle parked</h1>
      </main>
    )
  }

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
          </div>
        ))}
      </div>
    </main>
  )
}
