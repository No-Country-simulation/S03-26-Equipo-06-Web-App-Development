'use client'
import { usePathname } from 'next/navigation'
import Sidebar from './components/sidebar/sidebar'
import Header from './components/header/header'
import { AuthProvider } from './context/AuthContext'

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const hideSidebarRoutes = ['/', '/ingresar', '/registro']
  const hideSidebar = hideSidebarRoutes.includes(pathname)

  const titulo = () => {
    if (pathname === '/') return 'Publicaciones'
    if (pathname === '/dashboard') return 'Dashboard'
    if (pathname === '/dashboard/publicaciones') return 'Publicaciones'
    if (pathname === '/dashboard/crear-publicacion') return 'Crear Publicaciones'
    if (pathname === '/dashboard/usuarios-registrados') return 'Usuarios'
    if (pathname === '/ingresar') return 'Ingresar'
    if (pathname === '/registro') return 'Regristrarse'

    return 'Dashboard'
  }

  return (
    <AuthProvider>
      <Header titulo={titulo()} pathname={pathname} />
      <div className='flex h-full'>
        {!hideSidebar && <Sidebar />}

        <main className='flex-1 overflow-y-auto'>{children}</main>
      </div>
    </AuthProvider>
  )
}
