import { Trash2, Edit, Eye } from 'lucide-react'
import { Testimonio } from '@/types/testimonio'

type Props = {
  testimonio: Testimonio
  setVideoActivo: (url: string | null) => void
  handleDelete?: (id: string) => void
  handleEdit?: (id: string) => void
  handleView?: (id: string) => void
}

export default function BotoneraDashboard({ setVideoActivo, testimonio }: Props) {
  return (
    <div className='flex gap-2'>
      <button
        onClick={() => testimonio.video_url && setVideoActivo(testimonio.video_url)}
        className='flex cursor-pointer items-center gap-1 rounded-md border border-blue-400 bg-blue-100 px-3 py-1 text-sm text-blue-700 hover:bg-blue-200'
      >
        <Eye className='h-4 w-4' /> Ver
      </button>
      <button className='flex cursor-pointer items-center gap-1 rounded-md border border-green-400 bg-green-100 px-3 py-1 text-sm text-green-700 hover:bg-green-200'>
        <Edit className='h-4 w-4' /> Editar
      </button>
      <button className='flex cursor-pointer items-center gap-1 rounded-md border border-red-400 bg-red-100 px-3 py-1 text-sm text-red-700 hover:bg-red-200'>
        <Trash2 className='h-4 w-4' /> Eliminar
      </button>
    </div>
  )
}
