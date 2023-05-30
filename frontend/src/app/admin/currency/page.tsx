'use client'

import { FormEvent } from 'react'
import { IoCarSportSharp } from 'react-icons/io5'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'
import Cookies from 'js-cookie'
import { iCurrency } from '@/interfaces/currency'

export default function UpdateCurrency() {
  const router = useRouter()

  async function submitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const token = Cookies.get('token')

    const formData = new FormData(event.currentTarget)

    const response = await api.get('/currency', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const currencies: iCurrency[] = response.data

    const currency = currencies.find(
      (curr) => curr.name === formData.get('role'),
    )

    const id = currency?.id

    await api.put(
      `/currency/${id}`,
      {
        quantity: Number(formData.get('quantity')),
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
        Select the Currency
        <div>
          <select name="role" className="rounded-full">
            <option value="">Select role</option>
            <option value="Um-Centavo">Um Centavo</option>
            <option value="Cinco-Centavos">Cinco Centavos</option>
            <option value="Dez-Centavos">Dez Centavos</option>
            <option value="Vinte-Cinco-Centavos">Vinte Cinco Centavos</option>
            <option value="Cinquenta-Centavos">Cinquenta Centavos</option>
            <option value="Um-Real">Um Real</option>
            <option value="Dois-Reais">Dois Reais</option>
            <option value="Cinco-Reais">Cinco Reais</option>
            <option value="Dez-Reais">Dez Reais</option>
            <option value="Vinte-Reais">Vinte Reais</option>
            <option value="Cinquenta-Reais">Cinquenta Reais</option>
            <option value="Cem-Reais">Cem Reais</option>
            <option value="Duzentos-Reais">Duzentos Reais</option>
          </select>
        </div>
        <div className="h-4" />
        <div className="flex flex-col">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            className="rounded-full"
          />
        </div>
        <div className="h-4" />
        <div className="text-center">
          <button
            type="submit"
            className="btn btn-block btn-primary btn-block mb-4 rounded-full bg-gray-500 px-5 py-3 hover:bg-gray-400"
          >
            Update
          </button>
        </div>
      </form>
    </main>
  )
}
