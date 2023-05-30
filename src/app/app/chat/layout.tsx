'use client'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'

export default function ChatLayout ({ children }: {children: ReactNode}) {
  const router = useRouter()
  return (
    <main className='h-screen'>
      <header className='p-4 h-24'>
        <div className='h-full relative flex items-center'>
          <div className='h-full absolute flex flex-col justify-center'>
            <button onClick={() => router.push('/')} className='btn btn-ghost left-0 self-start'>Go Back</button>
          </div>
          <h1 className='grow text-3xl text-center font-bold'>Chat</h1>
        </div>
      </header>
      <div className='relative w-full h-[calc(100%-6rem)]'>
        {children}
      </div>
    </main>
  )
}
