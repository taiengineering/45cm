import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PROTECTED = ['/dashboard','/drafts','/queues','/analytics','/system','/settings']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  // Check if protected route
  const isProtected = PROTECTED.some(p => pathname.startsWith(p))
  if (!isProtected) return NextResponse.next()

  // Check session cookie (Supabase sets sb-* cookies)
  const hasSession = request.cookies.getAll().some(c => c.name.startsWith('sb-'))
  if (!hasSession) {
    // For now, allow access (auth not fully connected yet)
    // Uncomment below when Supabase Auth is connected:
    // return NextResponse.redirect(new URL('/login', request.url))
  }
  return NextResponse.next()
}

export const config = { matcher: ['/((?!_next|login|api|favicon).*)'] }
