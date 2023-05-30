import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware (request: NextRequest) {
  const userCookie = request.cookies.get('user')

  if (userCookie) {
    const { id, username } = JSON.parse(userCookie.value)
    if (Number.isInteger(id) && typeof username === 'string') {
      return NextResponse.next()
    }
  }

  const res = NextResponse.redirect(new URL('/', request.url))
  res.cookies.delete('user')
  return res
}

export const config = {
  matcher: '/app/:path*'
}
