import { redirect } from 'next/navigation'
import { getSessionUser } from '@/utils/session'
import { StartUserMenu } from '../components'

export default async function SessionPage () {
  const user = getSessionUser()
  if (!user) {
    redirect('/start')
  }
  return (
    <main className='flex flex-col items-center justify-center min-h-screen'>
      <div className='flex flex-col items-center gap-5 py-8'>
        <h1 className='text-3xl font-bold text-center'><span className='text-xl opacity-50'>Hello {user!.username}, this is </span><span className='block'>Chatapp</span></h1>
        <StartUserMenu />
      </div>
    </main>
  )
}
