import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin/logout')) {

    const response = NextResponse.redirect(new URL('/', request.url))
    
    response.cookies.set('TGManager_Admin_Token', '', {
      expires: new Date()
    })

    return response
  }
  else {
    return NextResponse.next()
  }
}