'use client'

import Cookies from 'js-cookie'
import Link from 'next/link'

export function Logout() {
  function logout() {
    Cookies.remove('token')
  }
  return (
    <Link
      href="/"
      onClick={logout}
      className="btn btn-block btn-primary btn-block mb-4 rounded-full bg-gray-500 px-5 py-3 hover:bg-gray-400"
    >
      Logout
    </Link>
  )
}
