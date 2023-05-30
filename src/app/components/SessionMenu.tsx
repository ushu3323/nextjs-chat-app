'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import LoadingButton from './LoadingButton'

async function logout () {
  const res = await fetch('/api/logout')
  if (!res.ok) {
    const data = await res.json()
    throw Error(`${data.error} - ${data.message}`)
  }
}

export default function SessionMenu () {
  const router = useRouter()
  const [loadingButtons, setloadingButtons] = useState({ resume: false, finish: false })

  function handleResumeClick () {
    setloadingButtons({ ...loadingButtons, resume: true })
    router.replace('/app/chat')
  }

  async function handleFinishClick () {
    setloadingButtons({ ...loadingButtons, finish: true })
    await logout()
    router.refresh()
  }
  return (
    <div className='flex flex-col min-w-full gap-3'>
      <LoadingButton className='btn-primary mx-5' onClick={handleResumeClick} isLoading={loadingButtons.resume}>Continue</LoadingButton>
      <LoadingButton className='btn-error mx-5' onClick={handleFinishClick} isLoading={loadingButtons.finish}>Logout</LoadingButton>
    </div>
  )
}
