'use client'
import { useState } from 'react'
import { Home, MessageSquare, Plus } from 'lucide-react'
import { PropsSidebar } from '@/types/sidebar'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const ButtonSidebar = dynamic(() => import('../../components/ui/open-sidebar'), { ssr: false })

const nav: PropsSidebar[] = [
  { id: 1, icon: <Home />, text: 'Dashboard', url: '/dashboard' },
  { id: 2, icon: <MessageSquare />, text: 'Testimonios', url: '/dashboard/testimonios' },
  { id: 3, icon: <Plus />, text: 'Crear', url: '/dashboard/crear-testimonio' },
]

export default function Sidebar() {
  const [open, setOpen] = useState(true)

  return (
    <div
      className={`fixed top-0 left-0 z-50 h-screen border-r rounded-tr-2xl text-white border-white/20 bg-linear-to-b from-blue-600 via-blue-500/80 to-blue-700 backdrop-blur-md shadow-lg transition-all duration-300 
                 ${open ? 'w-64' : 'w-16'}
                `}
    >
      {/*Header*/}
      <div className='flex items-center justify-between p-4'>
        {open && <h1 className='text-lg font-bold'>Testimonial CMS</h1>}

        <ButtonSidebar setOpen={setOpen} open={open} />
      </div>

      {/* Menu*/}
      <nav className='flex flex-col gap-3 p-2 '>
        <ul>
          {nav.map(nave => (
            <li key={nave.id}>
              <Link href={nave.url}>
                <Item icon={nave.icon} text={nave.text} open={open} />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

function Item({ icon, text, open }: { icon: React.ReactNode; text: string; open: boolean }) {
  return (
    <div
      className={`flex cursor-pointer items-center gap-3 rounded-lg p-3 transition hover:bg-gray-200/70 ${open ? 'justify-start' : 'justify-center'} `}
    >
      {icon}
      {open && <span className='text-sm'>{text}</span>}
    </div>
  )
}
