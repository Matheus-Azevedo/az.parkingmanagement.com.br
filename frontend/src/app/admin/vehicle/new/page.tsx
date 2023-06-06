'use client'

import { FormEvent } from 'react'
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
    <main className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Register Vehicle</h1>
      <div className="h-4" />
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
        <ButtonSubmit btnName="Register" />
      </form>
    </main>
  )
}
