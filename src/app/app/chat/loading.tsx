'use client'
import { useEffect, useState } from 'react'

const animation = [
  'Connecting.',
  'Connecting..',
  'Connecting...'
]

function LoadingTextAnimation () {
  const [message, setMessage] = useState(animation[0])

  useEffect(() => {
    setTimeout(() => {
      if (message === animation[0]) {
        setMessage(animation[1])
      } else if (message === animation[1]) {
        setMessage(animation[2])
      } else {
        setMessage(animation[0])
      }
    }, 1000)
  }, [message])

  return <h1 className='text-3xl font-bold'>{message}</h1>
}

export default function LoadingPage () {
  return (
    <main className='flex flex-col items-center justify-center h-full'>
      <div className='flex flex-col items-center'>
        <LoadingTextAnimation />
      </div>
    </main>
  )
}
