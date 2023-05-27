'use client'

import Link from 'next/link'
import React, { FormEvent, useState } from 'react'
import axios from 'axios'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const { data } = await axios.post('/register', {
        email,
        password,
      })

      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div className="row d-flex justify-content-center mt-5">
        <div className="col-10 col-lg-5 ">
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
        </div>
      </div>
    </div>
  )
}
