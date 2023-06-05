'use client'

import Link from 'next/link'
import React, { FormEvent } from 'react'
import { IoCarSportSharp } from 'react-icons/io5'
import { useRouter } from 'next/navigation'
import { loginForm } from '@/functions/loginForm'
import { InputEmailAddress } from '@/components/InputEmailAddress'
import { InputPassword } from '@/components/InputPassword'
import { ButtonSubmit } from '@/components/ButtonSubmit'

export default function Login() {
  const router = useRouter()

  async function submitHandler(event: FormEvent<HTMLFormElement>) {
    const role = await loginForm(event)

    if (role === 'admin') router.push('/admin')
    else router.push('/user')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <IoCarSportSharp className="h-24 w-24" />
      <form
        className="border-secondary rounded border p-4"
        onSubmit={submitHandler}
      >
        <h1 className="mb-4 text-center">Login</h1>
        <InputEmailAddress />
        <InputPassword />
        <ButtonSubmit btnName="Sign in" />
        <div className="text-center">
          <p>
            Not a member? <Link href="/register">Register</Link>
          </p>
        </div>
      </form>
    </main>
  )
}
