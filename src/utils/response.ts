import { NextRequest, NextResponse } from 'next/server'

type ErrorBody = {
  statusCode: number,
  message?: string,
  error: string,
}

function ErrorResponse (body: ErrorBody) {
  body.message = body.message || body.error
  return NextResponse.json(body, { status: body.statusCode })
}

export class HttpError {
  static Conflict (message?: string) {
    return ErrorResponse({
      statusCode: 409,
      message,
      error: 'Conflict'
    })
  }

  static ServerError (message?: string) {
    return ErrorResponse({
      statusCode: 500,
      message,
      error: 'Internal Server Error'
    })
  }
}

export function handleServerError (request: NextRequest, error: Error): NextResponse {
  console.error('Internal Server Error in Endpoint "%s":\n%s', request.url, error)
  return HttpError.ServerError()
}
