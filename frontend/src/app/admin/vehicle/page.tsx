'use client'

import { FormEvent } from 'react'
import { IoCarSportSharp } from 'react-icons/io5'
import { useRouter } from 'next/navigation'
import { InputEmailAddress } from '@/components/InputEmailAddress'
import { ButtonSubmit } from '@/components/ButtonSubmit'
import { registerVehicleForm } from '@/functions/registerVehicleForm'

export default function RegisterVehicle() {
  const router = useRouter()

  async function submitHandler(event: FormEvent<HTMLFormElement>) {
    registerVehicleForm(event)
    router.push('/admin')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <IoCarSportSharp className="h-24 w-24" />
      <h1 className="text-4xl font-bold">Register Vehicle</h1>
      <form
        onSubmit={submitHandler}
        className="border-secondary rounded border p-4"
      >
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="plaque_field">
            Plaque
          </label>
          <input
            type="text"
            id="plaque_field"
            name="plaque_field"
            className="form-control w-full rounded-full"
          />
        </div>
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="model_field">
            Model
          </label>
          <input
            type="text"
            id="model_field"
            name="model_field"
            className="form-control w-full rounded-full"
          />
        </div>
        <InputEmailAddress />
        <ButtonSubmit props="Register" />
      </form>
    </main>
  )
}
