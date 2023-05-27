'use client'

import Link from 'next/link'
import React, { FormEvent, useState } from 'react'
import { api } from '@/lib/api'
import Cookies from 'js-cookie'
import { IoCarSportSharp } from 'react-icons/io5'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function submitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const { data } = await api.post('/login', {
      email,
      password,
    })

    const { token } = data

    console.log(token)

    Cookies.set('token', token)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <IoCarSportSharp className="h-24 w-24" />
      <form
        className="border-secondary rounded border p-4"
        onSubmit={submitHandler}
      >
        <h1 className="mb-4 text-center">Login</h1>
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="email_field">
            Email address
          </label>
          <input
            type="email"
            id="email_field"
            className="form-control w-full rounded-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="password_field">
            Password
          </label>
          <input
            type="password"
            id="password_field"
            className="form-control w-full rounded-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="btn btn-block btn-primary btn-block mb-4 rounded-full bg-gray-500 px-5 py-3 hover:bg-gray-400"
          >
            Sign in
          </button>
        </div>

        <div className="text-center">
          <p>
            Not a member? <Link href="/register">Register</Link>
          </p>
        </div>
      </form>
    </main>
  )
}
