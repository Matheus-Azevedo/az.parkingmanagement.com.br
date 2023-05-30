'use client'

import Cookies from 'js-cookie'
import Link from 'next/link'
import { useRouter } from 'next/router'

export function Logout() {
  const router = useRouter()

  function logout() {
    Cookies.remove('token')
    router.push('/')
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
