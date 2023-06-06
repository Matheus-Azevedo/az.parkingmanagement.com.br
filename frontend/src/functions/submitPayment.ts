import { FormEvent } from 'react'

export async function submitPayment(
  event: FormEvent<HTMLFormElement>,
  value: number,
) {
  event.preventDefault()
  const formData = new FormData(event.currentTarget)
  console.log(formData.get('BANK-NOTE'))
  console.log(formData.get('COIN'))
  console.log(value)
}
