'use client'
import { usePathname } from 'next/navigation'
import Sidebar from './components/sidebar/sidebar'
import Header from './components/header/header'

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const hideSidebar = pathname === '/'

  const titulo=()=>{
    if (pathname === '/') return 'Testimonios'
    if (pathname === '/dashboard') return 'Dashboard'
    if (pathname === '/dashboard/testimonios') return 'Editar Testimonios'
    if (pathname === '/dashboard/crear-testimonio') return 'Crear Testimonio'

      return 'Dashboard'
  }

  return (
    <>
      <Header titulo={titulo()} pathname={pathname} />
      <div className='flex h-full'>
        {!hideSidebar && <Sidebar />}
        <main className='flex-1 overflow-y-auto'>{children}</main>
      </div>
    </>
  )
}