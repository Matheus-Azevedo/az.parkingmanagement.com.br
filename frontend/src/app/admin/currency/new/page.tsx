'use client'

import { FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { ButtonSubmit } from '@/components/ButtonSubmit'
import { registerCurrencyUpdateForm } from '@/functions/registerCurrencyUpdateForm'

export default function NewCurrency() {
  const router = useRouter()

  async function submitHandler(event: FormEvent<HTMLFormElement>) {
    await registerCurrencyUpdateForm(event)

    router.push('/admin')
  }

  return (
    <main className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Update Stock</h1>
      <div className="h-4" />
      <form
        onSubmit={submitHandler}
        className="border-secondary rounded border p-4"
      >
        Select the Currency
        <div className="form-outline mb-4">
          <select name="role" className="form-control w-full rounded-full">
            <option value="">Select role</option>
            <option value="0.01">Um Centavo</option>
            <option value="0.05">Cinco Centavos</option>
            <option value="0.10">Dez Centavos</option>
            <option value="0.25">Vinte Cinco Centavos</option>
            <option value="0.50">Cinquenta Centavos</option>
            <option value="1">Um Real</option>
            <option value="2">Dois Reais</option>
            <option value="5">Cinco Reais</option>
            <option value="10">Dez Reais</option>
            <option value="20">Vinte Reais</option>
            <option value="50">Cinquenta Reais</option>
            <option value="100">Cem Reais</option>
            <option value="200">Duzentos Reais</option>
          </select>
        </div>
        <div className="h-4" />
        <div className="form-outline mb-4">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            className="form-control w-full rounded-full"
          />
        </div>
        <div className="h-4" />
        <ButtonSubmit btnName="Update" />
      </form>
    </main>
  )
}
