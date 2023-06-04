import { iProps } from '@/interfaces/props'
import { FormEvent } from 'react'

export async function submitPayment(
  event: FormEvent<HTMLFormElement>,
  props: iProps,
) {
  event.preventDefault()
  const formData = new FormData(event.currentTarget)
  console.log(formData.get('BANK-NOTE'))
  console.log(formData.get('COIN'))
  console.log(props)
}
