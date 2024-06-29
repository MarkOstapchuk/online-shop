import { NextRequest, NextResponse } from 'next/server'

import routes from '@/config/routes'

import { EnumTokens } from '@/services/authToken.service'

export async function middleware(request: NextRequest, response: NextResponse) {
  const { url, cookies } = request
  const refreshToken = cookies.get(EnumTokens.REFRESH_TOKEN)?.value
  const isAuthPage = url.includes('/login') || url.includes('/register')
  const needAuthPage = url.includes('/orders') || url.includes('/profile')
  if (isAuthPage && refreshToken) {
    return NextResponse.redirect(new URL(routes.HOME, url))
  }
  if (isAuthPage) {
    return NextResponse.next()
  }
  if (!refreshToken && needAuthPage) {
    return NextResponse.redirect(new URL(routes.LOGIN, request.url))
  }
  return NextResponse.next()
}
export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)'
}
