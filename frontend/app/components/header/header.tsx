'use client'
import IngresarRegistrarseBotones from '../IngresarRegistrarseBotones/IngresarRegistrarseBotones'
import { useAuth } from '@/app/context/AuthContext'
import { LogOut, User, UserCheck, UserKey, Home } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Props {
  titulo: string
  pathname: string
}

export default function Header({ titulo, pathname }: Props) {
  const { isLogged, logout, rol, nombre } = useAuth()
  const router = useRouter()
  const showBack = pathname === '/ingresar' || pathname === '/registro'
  const displayName = nombre
    ? nombre.includes('@')
      ? nombre.split('@')[0].charAt(0).toUpperCase() + nombre.split('@')[0].slice(1)
      : nombre
    : 'Usuario'

  const UserIcon = (() => {
    switch (rol) {
      case 'ROLE_ADMIN':
        return UserKey
      case 'ROLE_EDITOR':
        return UserCheck
      case 'ROLE_USUARIOVISITANTE':
        return User
      default:
        return User
    }
  })()

  return (
    <header className='sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white/80 px-6 backdrop-blur-md sm:h-20 sm:px-20'>
      {/* izquierda */}
      <div className='flex items-center gap-4'>
        {showBack && (
          <button
            onClick={() => router.push('/')}
            className='flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-blue-600'
          >
            <Home size={18} />
            <span className='hidden sm:block'>Volver</span>
          </button>
        )}

        <div className='h-6 w-px bg-gray-300' />

        <h1 className='p-3 text-[16px] font-bold tracking-tight text-blue-600 sm:text-xl'>{titulo}</h1>
      </div>

      {/* derecha */}
      {isLogged ? (
        <div className='flex items-center gap-4'>
          {/* usuario */}
          <div className='flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5'>
            <UserIcon size={18} className='text-blue-500' />
            <span className='text-sm font-medium text-gray-700'>{displayName}</span>
          </div>

          {/* logout */}
          <button
            onClick={logout}
            className='flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition-all duration-200 hover:bg-red-100 hover:shadow-sm active:scale-[0.97]'
          >
            <LogOut size={16} />
            <span className='hidden sm:block'>Salir</span>
          </button>
        </div>
      ) : (
        <IngresarRegistrarseBotones />
      )}
    </header>
  )
}
