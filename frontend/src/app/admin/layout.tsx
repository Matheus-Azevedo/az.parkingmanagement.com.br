import { Logout } from '@/components/Logout'
import { LinkToPage } from '@/components/LinkToPage'
import { ReactNode } from 'react'
import { IoCarSportSharp } from 'react-icons/io5'
import { iToken } from '@/interfaces/token'
import jwtDecode from 'jwt-decode'
import { cookies } from 'next/headers'
import { YouAreNotLogged } from '@/components/YouAreNotLogged'

export default async function AdminLayout({
  children,
}: {
  children: ReactNode
}) {
  const token = cookies().get('token')?.value

  if (!token) {
    return <YouAreNotLogged />
  }
  const decryptedToken: iToken = jwtDecode(token)
  const { name } = decryptedToken
  return (
    <div className="flex min-h-screen flex-col items-center">
      <header className="flex flex-col items-center justify-center p-24">
        <IoCarSportSharp className="h-24 w-24" />
        <h1 className="text-4xl font-bold">Welcome admin, {name}!</h1>
      </header>
      <nav className="flex items-center space-x-4">
        <LinkToPage href="/admin" btnName="Home" />
        <LinkToPage href="/admin/vehicle/list" btnName="List Vehicles" />
        <LinkToPage href="/admin/vehicle/new" btnName="Register Vehicle" />
        <LinkToPage href="/admin/currency/stock" btnName="List Currency" />
        <LinkToPage href="/admin/currency/new" btnName="Update Currency" />
        <Logout />
      </nav>
      <main className="flex-1 p-24">{children}</main>
    </div>
  )
}
