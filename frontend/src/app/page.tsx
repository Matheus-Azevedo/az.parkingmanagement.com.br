import { LinkToPage } from '@/components/LinkToPage'
import { IoCarSportSharp } from 'react-icons/io5'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <IoCarSportSharp className="h-24 w-24" />
      <h1 className="text-center text-6xl font-bold">
        Welcome to Parking Management!
      </h1>
      <div className="flex items-center justify-center space-x-2 p-4">
        <LinkToPage href="/login" btnName="Login" />
        <LinkToPage href="/register" btnName="Register" />
      </div>
      <div className="flex flex-col items-center justify-center p-4">
        <p> Car price per hour: R$ 5,00</p>
        <p> Moto price per hour: R$ 2,00</p>
      </div>
    </main>
  )
}
