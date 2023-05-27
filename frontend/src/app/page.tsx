import Link from 'next/link'
import { IoCarSportSharp } from 'react-icons/io5'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <IoCarSportSharp className="h-24 w-24" />
      <h1 className="text-center text-6xl font-bold">
        Welcome to Parking Management!
      </h1>
      <div className="flex items-center justify-center p-4">
        <Link
          href="/login"
          className="btn btn-block btn-primary btn-block mb-4 rounded-full bg-gray-500 px-5 py-3 hover:bg-gray-400"
        >
          {' '}
          Login{' '}
        </Link>
        <div className="w-1" />
        <Link
          href="/register"
          className="btn btn-block btn-primary btn-block mb-4 rounded-full bg-gray-500 px-5 py-3 hover:bg-gray-400"
        >
          {' '}
          Register{' '}
        </Link>
      </div>
    </main>
  )
}
