import { Login } from '@/components/Login'
import { IoCarSportSharp } from 'react-icons/io5'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <IoCarSportSharp className="h-24 w-24" />
      <h1 className="text-center text-6xl font-bold">
        Welcome to Parking Management!
      </h1>
      <Login />
    </main>
  )
}
