'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/context/AuthContext'
import { LogIn, LogOut } from 'lucide-react'
export default function IngresarRegistrarseBotones() {
  const router = useRouter()
  const { isLogged, logout } = useAuth()


  return (
    <>
      {isLogged ? (
        <button
          onClick={logout}
          className='flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-red-300 bg-red-50 px-2 py-2 text-sm font-medium text-red-700 transition-all duration-200 hover:bg-red-100 hover:shadow-sm active:scale-[0.98]'
        >
          <LogOut size={18} className='opacity-80' />
          Salir
        </button>
      ) : (
        <div className='mt-2 ml-0 flex w-25 cursor-pointer items-center justify-between text-black sm:ml-8'>
          <button
            onClick={() => router.push('/ingresar')}
            className='cursor-pointer flex w-full items-center justify-center gap-2 rounded-lg border border-blue-300 bg-blue-50 px-2 py-2 text-sm font-medium text-blue-400 transition-all duration-500 hover:bg-blue-100 hover:shadow-sm active:scale-[0.98]'
          >
            <LogIn size={22} className='opacity-80' />
            Ingresar
          </button>
        </div>
      )}
    </>
  )
}
