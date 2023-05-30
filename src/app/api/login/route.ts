import { NextRequest, NextResponse } from 'next/server'
import { HttpError, handleServerError } from '../../../utils/response'
import { UserService } from '../../../utils/services'
import { UsernameInUse } from '../../../utils/services/errors'

export async function POST (request: NextRequest): Promise<NextResponse> {
  const { username } = await request.json() as { username: string }

  try {
    const user = UserService.create(username)
    const res = NextResponse.redirect(new URL('/app/chat', request.url))
    res.cookies.set('user', JSON.stringify({ id: user.id, username: user.username }))
    return res
  } catch (error) {
    if (error instanceof UsernameInUse) {
      return HttpError.Conflict('Username already exists')
    }
    return handleServerError(request, error as Error)
  }
}
