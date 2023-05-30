import { WelcomeForm } from '../components'
import { redirect } from 'next/navigation'
import { getSessionUser } from '../../utils/session'

export default async function StartPage () {
  const user = getSessionUser()
  if (user) {
    redirect('/app')
  }
  return (
    <main className='flex flex-col items-center justify-center min-h-screen'>
      <div className='flex flex-col items-center gap-5 py-8'>
        <h1 className='text-3xl font-bold text-center'><span className='text-xl opacity-50'>Welcome to</span><span className='block'>Chatapp</span></h1>
        <WelcomeForm />
      </div>
    </main>
  )
}

export const dynamic = 'force-dynamic'
export const revalidate = 0
