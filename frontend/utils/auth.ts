import { jwtDecode } from 'jwt-decode'

type TokenPayload = {
  sub: string
  rol: string
  exp: number
}

// obtengo el  token
export function getToken() {
  return localStorage.getItem('token');
}

// obtengo el rol
export function getUserRole(): string | null {
  const token = getToken();
  if (!token) return null

  try {
    const decoded: TokenPayload = jwtDecode(token);
    return decoded.rol
  } catch {
    return null
  }
}

//verica expiracion
export function isTokenExpired(): boolean {
  const token = getToken();
  if (!token) return true

  try {
    const decoded: TokenPayload = jwtDecode(token);
    return decoded.exp * 1000 < Date.now()
  } catch {
    return true
  }
}
