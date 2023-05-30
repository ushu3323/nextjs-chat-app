import { redirect } from 'next/navigation'
import { getSessionUser } from '../utils/session'

export default async function RootPage () {
  const user = getSessionUser()
  if (user) {
    redirect('/app')
  } else {
    redirect('/start')
  }
  // TODO: Create landing page
  return null
}
