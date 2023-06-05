'use client'

import { FormEvent } from 'react'
import { IoCarSportSharp } from 'react-icons/io5'
import { useRouter } from 'next/navigation'
import { ButtonSubmit } from '@/components/ButtonSubmit'
import { registerCurrencyUpdateForm } from '@/functions/registerCurrencyUpdateForm'

export default function UpdateCurrency() {
  const router = useRouter()

  async function submitHandler(event: FormEvent<HTMLFormElement>) {
    await registerCurrencyUpdateForm(event)

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
        <ButtonSubmit props="Update" />
      </form>
    </main>
  )
}
