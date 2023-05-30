'use client'

import { FormEvent } from 'react'
import { IoCarSportSharp } from 'react-icons/io5'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'
import Cookies from 'js-cookie'

export default function RegisterVehicle() {
  const router = useRouter()

  async function submitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const token = Cookies.get('token')

    const formData = new FormData(event.currentTarget)

    await api.post(
      '/vehicles',
      {
        plaque: formData.get('plaque_field'),
        model: formData.get('model_field'),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

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

        <div className="text-center">
          <button
            type="submit"
            className="btn btn-block btn-primary btn-block mb-4 rounded-full bg-gray-500 px-5 py-3 hover:bg-gray-400"
          >
            Register
          </button>
        </div>
      </form>
    </main>
  )
}
