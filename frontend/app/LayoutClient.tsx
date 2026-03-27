'use client'
import { usePathname } from 'next/navigation'
import Sidebar from './components/sidebar/sidebar'

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const hideSidebar = pathname === '/'

  return (
    <div className='flex h-full'>
      {!hideSidebar && <Sidebar />}
      <main className='flex-1 overflow-y-auto'>{children}</main>
    </div>
  )
}