'use client'

import { submitPayment } from '@/functions/submitPayment'
import { iProps } from '@/interfaces/props'
import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'
import { ButtonSubmit } from './ButtonSubmit'

export function FinishParking(props: iProps) {
  const router = useRouter()

  async function handleSubmitPayment(event: FormEvent<HTMLFormElement>) {
    submitPayment(event, props)
    router.push('/')
  }

  return (
    <form onSubmit={handleSubmitPayment} className="flex flex-col items-center">
      <div className="flex flex-row items-center">
        <label htmlFor="BANK-NOTE">R$</label>
        <div className="w-1" />
        <input
          type="number"
          name="BANK-NOTE"
          id="BANK-NOTE"
          className="w-20 rounded-lg border-2 border-gray-500"
        />
        <div className="w-1" />
        <label htmlFor="COIN">,</label>
        <div className="w-1" />
        <input
          type="number"
          name="COIN"
          id="COIN"
          className="w-16 rounded-lg border-2 border-gray-500"
        />
      </div>
      <div className="h-4" />
      <ButtonSubmit props="Finish Parking" />
    </form>
  )
}
