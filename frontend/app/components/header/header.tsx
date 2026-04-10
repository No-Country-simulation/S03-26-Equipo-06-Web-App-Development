'use client'
import IngresarRegistrarseBotones from '../IngresarRegistrarseBotones/IngresarRegistrarseBotones'
import { useAuth } from '@/app/context/AuthContext'
import { LogOut, User, UserCheck, UserKey } from 'lucide-react'

interface Props {
  titulo: string
  pathname: string
}
export default function Header({ titulo, pathname }: Props) {
  const { isLogged, logout, rol, nombre } = useAuth()

  const displayName = nombre
    ? nombre.includes('@')
      ? nombre.split('@')[0].charAt(0).toUpperCase() + nombre.split('@')[0].slice(1)
      : nombre
    : 'Usuario'

  //icono segun el rol
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
    <header className='flex h-16 w-full items-center justify-between border-b border-gray-300/40 bg-white px-6 sm:h-20 sm:px-20'>
      <h1 className={`p-3 text-[16px] font-bold tracking-tight text-blue-600 sm:text-xl ${pathname === '/' ? 'ml-0' : 'ml-15'}`}>{titulo}</h1>

      {isLogged ? (
        <div className='flex items-center gap-3'>
          <UserIcon size={20} className='text-blue-500' />
          <span className='text-sm font-medium text-gray-600 sm:text-base'>{displayName}</span>
          <button
            onClick={logout}
            className='flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition-all duration-200 hover:bg-red-100 hover:shadow-sm active:scale-[0.98]'
          >
            <LogOut size={18} className='opacity-80' />
            Salir
          </button>
        </div>
      ) : (
        <IngresarRegistrarseBotones />
      )}
    </header>
  )
}
