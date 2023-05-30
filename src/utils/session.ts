import { cookies } from 'next/headers'

export function getSessionUser () {
  let user: {id: number, username: string} | null = null
  const cookieStore = cookies()
  if (cookieStore.has('user')) {
    const data = JSON.parse(cookieStore.get('user')?.value ?? '{}')
    if (Number.isInteger(data.id) && typeof data.username === 'string') {
      user = data
    }
  }
  return user
}
