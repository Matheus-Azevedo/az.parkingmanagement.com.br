'use client'

import React, { FormEvent } from 'react'
import { IoCarSportSharp } from 'react-icons/io5'
import { useRouter } from 'next/navigation'
import { ButtonSubmit } from '@/components/ButtonSubmit'
import { registerForm } from '@/functions/registerForm'
import { InputEmailAddress } from '@/components/InputEmailAddress'
import { InputPassword } from '@/components/InputPassword'

export default function Register() {
  const router = useRouter()

  async function submitHandler(event: FormEvent<HTMLFormElement>) {
    await registerForm(event)

    router.push('/login')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <IoCarSportSharp className="h-24 w-24" />
      <form
        className="border-secondary rounded border p-4"
        onSubmit={submitHandler}
      >
        <h1 className="mb-4 text-center">Enter your registration</h1>
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="name_field">
            Name
          </label>
          <input
            type="text"
            id="name_field"
            name="name_field"
            className="form-control w-full rounded-full"
          />
        </div>
        <InputEmailAddress />
        <InputPassword />
        Role
        <div>
          <select name="role_field" className="rounded-full">
            <option value="">Select role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="h-4" />
        <ButtonSubmit btnName="Register" />
      </form>
    </main>
  )
}
