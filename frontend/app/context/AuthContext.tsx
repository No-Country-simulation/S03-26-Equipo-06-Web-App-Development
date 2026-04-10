'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type AuthContextType = {
  isLogged: boolean
  rol: string | null
  login: (token: string) => void
  logout: () => void
  nombre: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isLogged, setIsLogged] = useState(false)
  const [rol, setRol] = useState<string | null>(null)
  const [nombre, setNombre] = useState<string | null>(null)

  useEffect(() => {

    const initAuth = () => {
      if (typeof window === 'undefined') return //protección SSR
      const token = localStorage.getItem('token')
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]))
          setIsLogged(true)
          setRol(payload.rol)
          setNombre(payload.nombre || payload.sub) // fallback
        } catch (error: unknown) {
          if (error instanceof Error) {
            console.error('Token inválido', error.message)
          } else {
            console.error('Token inválido', error)
          }
          localStorage.removeItem('token')
        }
      }
    }

    initAuth()
  }, [])

  const login = (token: string) => {
    localStorage.setItem('token', token)
    document.cookie = `token=${encodeURIComponent(token)}; path=/; max-age=86400; sameSite=Lax`

    const payload = JSON.parse(atob(token.split('.')[1]))
    setRol(payload.rol)
    setIsLogged(true)
    setNombre(payload.sub)
    //Redirige rol
    if (payload.rol === 'ROLE_ADMIN') router.push('/dashboard/')
    else if (payload.rol === 'ROLE_EDITOR') router.push('/dashboard/')
    else router.push('/')
  }

  const logout = () => {
    localStorage.removeItem('token')
    document.cookie = 'token=; path=/; max-age=0; sameSite=Lax'
    setIsLogged(false)
    setRol(null)
    setNombre(null)
    router.replace('/')
  }

  return <AuthContext.Provider value={{ nombre, isLogged, rol, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider')
  return context
}