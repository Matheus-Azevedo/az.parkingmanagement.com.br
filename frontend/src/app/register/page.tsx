'use client'

import React, { FormEvent } from 'react'
import { IoCarSportSharp } from 'react-icons/io5'
import { useRouter } from 'next/navigation'
import { ButtonSubmit } from '@/components/ButtonSubmit'
import { registerForm } from '@/functions/registerForm'

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
            name="name"
            className="form-control w-full rounded-full"
          />
        </div>
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="email_field">
            Email address
          </label>
          <input
            type="email"
            id="email_field"
            name="email"
            className="form-control w-full rounded-full"
          />
        </div>
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="password_field">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password_field"
            className="form-control w-full rounded-full"
          />
        </div>
        Role
        <div>
          <select name="role" className="rounded-full">
            <option value="">Select role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="h-4" />
        <div className="text-center">
          <ButtonSubmit props="Register" />
        </div>
      </form>
    </main>
  )
}
