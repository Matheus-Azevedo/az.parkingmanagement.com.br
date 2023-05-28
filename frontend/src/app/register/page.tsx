'use client'

import Cookies from 'js-cookie'
import React, { FormEvent, useState } from 'react'
import { IoCarSportSharp } from 'react-icons/io5'
import { api } from '@/lib/api'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')

  async function submitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const { data } = await api.post('/register', {
      name,
      email,
      password,
      role,
    })

    const { token } = data

    Cookies.set('token', token)
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
            className="form-control w-full rounded-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
        Role
        <div>
          <select
            name="role"
            value={role}
            className="rounded-full"
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">Select role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="btn btn-block btn-primary btn-block mb-4 rounded-full bg-gray-500 px-5 py-3 hover:bg-gray-400"
          >
            Register
          </button>
        </div>
      </form>
    </main>
  )
}
