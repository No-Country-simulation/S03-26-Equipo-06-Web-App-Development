import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

function decodeToken(token: string) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => '%' + c.charCodeAt(0).toString(16).padStart(2, '0')).join(''))
    return JSON.parse(jsonPayload);
  } catch {
    return null
  }
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const pathname = request.nextUrl.pathname

  const isDashboard = pathname.startsWith('/dashboard');
  const isAuthPage = ['/ingresar', '/registro'].includes(pathname);

  if (!token && isDashboard) {
    return NextResponse.redirect(new URL('/ingresar', request.url));
  }

  if (token) {
    const decoded = decodeToken(token);
    if (!decoded) return NextResponse.redirect(new URL('/ingresar', request.url));
    const { rol } = decoded

    // Redirección según rol
    if (isDashboard) {
      if (rol === 'ROLE_ADMIN') {
        return NextResponse.next()
      } else if (rol === 'ROLE_EDITOR') {
        return NextResponse.next()
      } else {
        return NextResponse.redirect(new URL('/', request.url))
      }
    }

    // Si intenta acceder a login/registro estando logeado
    if (isAuthPage) {
      if (rol === 'ROLE_ADMIN' || rol === 'ROLE_EDITOR') {
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
