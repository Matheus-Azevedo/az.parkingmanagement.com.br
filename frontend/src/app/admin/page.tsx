'use client'

import { useState, useEffect } from 'react'
import dayjs from 'dayjs'

export default function Admin() {
  const [isLoading, setIsLoading] = useState(true)
  const [currentTime, setCurrentTime] = useState('')
  const [currentDate, setCurrentDate] = useState('')

  useEffect(() => {
    const timer = setInterval(() => {
      const now = dayjs()
      setCurrentTime(now.format('HH:mm:ss'))
      setCurrentDate(now.format('YYYY-MM-DD'))
      setIsLoading(false)
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">Loading...</h1>
      </div>
    )
  }

  return (
    <main className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Hora: {currentTime}</h1>
      <h1 className="text-4xl font-bold">Data: {currentDate}</h1>
    </main>
  )
}
