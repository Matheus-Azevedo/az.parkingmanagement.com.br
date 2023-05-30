'use client'

import { iProps } from '@/interfaces/props'
// import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'

export function FinishParking(props: iProps) {
  // const router = useRouter()

  async function submitPayment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    console.log(formData.get('BANK-NOTE'))
    console.log(formData.get('COIN'))
    console.log(props)
    // router.push('/')
  }

  return (
    <form onSubmit={submitPayment} className="flex flex-col items-center">
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
      <button
        type="submit"
        className="btn btn-block btn-primary btn-block mb-4 rounded-full bg-gray-500 px-5 py-3 hover:bg-gray-400"
      >
        Finish Parking
      </button>
    </form>
  )
}
