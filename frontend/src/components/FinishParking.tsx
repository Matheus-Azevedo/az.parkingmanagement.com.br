'use client'

import { useState, FormEvent, ChangeEvent } from 'react'
import { ButtonSubmit } from './ButtonSubmit'
import { calculatePayment } from '@/functions/calculatePayment'
import { updateCredit } from '@/functions/updateCredit'
import { deleteVehicle } from '@/functions/deleteVehicle'

export function FinishParking({
  finalPrice,
  creditLeft,
  vehicleId,
}: {
  finalPrice: number
  creditLeft: number
  vehicleId: string
}) {
  const [values, setSelectValues] = useState<string[]>([''])

  function handleSelectChange(
    index: number,
    event: ChangeEvent<HTMLSelectElement>,
  ) {
    const newSelectValues = [...values]
    newSelectValues[index] = event.target.value
    setSelectValues(newSelectValues)
  }

  function handleAddSelect() {
    setSelectValues([...values, ''])
  }

  function handleRemoveSelect(index: number) {
    const newSelectValues = [...values]
    newSelectValues.splice(index, 1)
    setSelectValues(newSelectValues)
  }

  async function handleSubmitPayment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (finalPrice !== 0) {
      await calculatePayment(values, finalPrice)
    }
    await updateCredit(creditLeft)
    await deleteVehicle(vehicleId)
    window.location.reload()
  }

  return (
    <form onSubmit={handleSubmitPayment} className="flex flex-col items-center">
      <div className="flex flex-col items-center justify-center">
        Selecione o valor a ser pago:
        {values.map((value, index) => (
          <div key={index} className="form-outline">
            <select
              name="role"
              className="form-control w-28 rounded-full"
              value={value}
              onChange={(event) => handleSelectChange(index, event)}
            >
              <option value="">Select</option>
              <option value="0.01">0,01</option>
              <option value="0.05">0,05</option>
              <option value="0.10">0,10</option>
              <option value="0.25">0,25</option>
              <option value="0.50">0,50</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="200">200</option>
            </select>
            <button
              type="button"
              onClick={() => handleRemoveSelect(index)}
              className="btn btn-block btn-primary btn-block rounded-full bg-gray-500 px-5 py-3 hover:bg-gray-400"
            >
              -
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={handleAddSelect}
        className="btn btn-block btn-primary btn-block mb-4 rounded-full bg-gray-500 px-5 py-3 hover:bg-gray-400"
      >
        +
      </button>
      <ButtonSubmit btnName="Finish Parking" />
    </form>
  )
}
