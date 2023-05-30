import { NextRequest, NextResponse } from 'next/server'
import { UserService } from '../../../utils/services'

export async function GET (request: NextRequest) {
  const userCookie = request.cookies.get('user')
  if (userCookie) {
    const { id } = JSON.parse(userCookie.value)
    if (Number.isInteger(id)) {
      UserService.remove(id)
    }
  }
  const res = NextResponse.redirect(new URL('/', request.url))
  res.cookies.delete('user')
  return res
}
