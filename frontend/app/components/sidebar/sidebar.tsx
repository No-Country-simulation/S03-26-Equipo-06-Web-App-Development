'use client'
import { useState } from 'react'
import { Home, MessageSquare, Plus, User } from 'lucide-react'
import { PropsSidebar } from '@/types/sidebar'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/app/context/AuthContext'


const ButtonSidebar = dynamic(() => import('../../components/ui/open-sidebar'), { ssr: false })

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const {rol}=useAuth()

  const nav: PropsSidebar[] = [
  { id: 1, icon: <Home />, text: 'Dashboard', url: '/dashboard' },
  { id: 2, icon: <MessageSquare />, text: 'Publicaciones', url: '/dashboard/publicaciones' },
  { id: 3, icon: <Plus />, text: 'Crear Publicación', url: '/dashboard/crear-publicacion' },
]


if(rol === "ROLE_ADMIN"){
  nav.push({ id: 4, icon: <User />, text: 'Usuarios Registrados', url: '/dashboard/usuarios-registrados' })
}

  return (
    <div
      className={`fixed top-0 left-0 z-50 h-screen rounded-tr-2xl border-r border-white/20 bg-linear-to-b from-blue-600 via-blue-500/80 to-blue-700 text-white shadow-lg backdrop-blur-md transition-all duration-500 ${open ? 'md:w-64' : 'w-0 md:w-16'} `}
    >
      {/*Header*/}
      <div className='flex items-center justify-between p-4'>
        {open && <h1 className='text-lg font-bold'>Testimonial CMS</h1>}

        <ButtonSidebar setOpen={setOpen} open={open} />
      </div>

      {/* Menu*/}
      <nav className='flex flex-col gap-3 p-2'>
        <ul>
          {nav.map(nave => (
            <li key={nave.id} className='py-1'>
              <Link href={nave.url} onClick={() => setOpen(false)}>
                <Item icon={nave.icon} text={nave.text} open={open} url={nave.url} />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

function Item({ icon, text, open, url }: { icon: React.ReactNode; text: string; open: boolean; url: string }) {
  const pathname = usePathname()
  const isActive = pathname === url

  return (
    <div
      className={`flex cursor-pointer items-center gap-3 rounded-lg p-3 transition ${isActive ? 'bg-white/20 text-white' : 'text-gray-200 hover:bg-gray-200/70'} ${open ? 'justify-start' : 'justify-center'} `}
    >
      {icon}
      {open && <span className='text-sm'>{text}</span>}
    </div>
  )
}