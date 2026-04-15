'use client'
import { Trash2, Edit, Eye } from 'lucide-react'
import { Testimonio } from '@/types/nuevo-testimonio'
import { useRouter } from 'next/navigation'

type Props = {
  testimonio: Testimonio
  setOpenModal: (value: boolean) => void
  setSelectedId: (id: number) => void
}
export default function BotoneraDashboard({ testimonio, setOpenModal, setSelectedId }: Props) {
  const router = useRouter()

  return (
    <div className='mt-8 flex gap-2'>
      
      <button
        onClick={() => router.push(`/testimonios/${testimonio.id_testimonio}`)}
        className='flex cursor-pointer items-center gap-1 rounded-md border border-blue-400 bg-blue-100 px-2 py-1 text-xs text-blue-700 hover:bg-blue-200 md:px-3 md:text-sm'
      >
        <Eye className='h-4 w-4' />
        <span className='hidden md:inline'>Ver</span>
      </button>

      <button className='flex cursor-pointer items-center gap-1 rounded-md border border-green-400 bg-green-100 px-2 py-1 text-xs text-green-700 hover:bg-green-200 md:px-3 md:text-sm'>
        <Edit className='h-4 w-4' />
        <span className='hidden md:inline'>Editar</span>
      </button>

      <button
        onClick={() => {
          setSelectedId(testimonio.id_testimonio!)
          setOpenModal(true)
        }}
        className='flex cursor-pointer items-center gap-1 rounded-md border border-red-400 bg-red-100 px-2 py-1 text-xs text-red-700 hover:bg-red-200 md:px-3 md:text-sm'
      >
        <Trash2 className='h-4 w-4' />
        <span className='hidden md:inline'>Eliminar</span>
      </button>
    </div>
  )
}
