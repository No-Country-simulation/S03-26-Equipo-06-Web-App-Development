'use client'

import { Trash2, Edit, Eye } from 'lucide-react'
import { Testimonio } from '@/types/testimonio'
import Image from 'next/image'

interface Props {
  testimonios: Testimonio[]
  loading: boolean
  handleDelete?: (id: number) => void
  handleEdit?: (id: number) => void
  handleView?: (id: number) => void
}

export function TestimonialCardDashboard({ testimonios, loading, handleDelete, handleEdit, handleView }: Props) {
  const getEstadoColor = (estado: string) => {
    switch (estado.toLowerCase()) {
      case 'publicado':
        return 'bg-green-100 text-green-700 border-green-300'
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300'
      case 'rechazado':
        return 'bg-red-100 text-red-700 border-red-300'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300'
    }
  }
  return (
    <div className='min-h-screen bg-linear-to-tr from-gray-100 via-gray-200 to-gray-100'>
      <h1 className='pt-15 pb-10 text-center text-3xl font-bold text-gray-900 md:text-4xl'>Dashboard - Testimonios</h1>

      {loading ? (
        <div className='flex h-64 items-center justify-center'>
          <div className='h-12 w-12 animate-spin rounded-full border-b-2 border-gray-900'></div>
        </div>
      ) : (
        <div className='mx-auto ml-15 flex flex-col gap-6 px-6 py-10 xl:px-30'>
          {testimonios.map(testimonio => (
            <div
              key={testimonio.id}
              className='flex flex-col items-start justify-between rounded-3xl border border-gray-200 bg-white/50 p-6 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl md:flex-row md:items-center'
            >
              {/* Imagen */}
              <div className='relative mr-6 shrink-0'>
                <Image
                  src={testimonio.imagen_url || 'https://via.placeholder.com/120'}
                  alt={testimonio.titulo}
                  className='h-24 w-24 rounded-full border-2 border-gray-300 object-cover shadow-md'
                  height={96}
                  width={96}
                />
              </div>

              {/* Información */}
              <div className='mt-4 flex-1 md:mt-0'>
                <h2 className='text-xl font-semibold text-gray-900'>{testimonio.titulo}</h2>
                <p className='mt-2 line-clamp-3 text-gray-700'>{testimonio.contenido}</p>
                <div className='mt-3 flex flex-wrap gap-2'>
                  <span className='text-sm font-medium text-indigo-600'>Categoría: {testimonio.categoria}</span>
                  <span className={`rounded-md border px-2 py-1 text-center text-sm font-medium ${getEstadoColor(testimonio.estado)}`}>{testimonio.estado}</span>

                  {testimonio.tags.length > 0 && <span className='text-sm font-medium text-gray-500'>Tags: {testimonio.tags.join(', ')}</span>}
                </div>
                <span className='mt-2 block text-xs text-gray-400'>{testimonio.fecha_creacion}</span>
              </div>

              {/* Botones */}
              <div className='mt-4 flex flex-wrap gap-3 md:mt-0'>
                <button
                  onClick={() => handleView && handleView(testimonio.id)}
                  className='flex cursor-pointer items-center gap-1 rounded-xl border border-blue-400 bg-blue-100 px-4 py-2 font-medium text-blue-700 transition hover:bg-blue-200'
                >
                  <Eye className='h-4 w-4' /> Ver
                </button>
                <button
                  onClick={() => handleEdit && handleEdit(testimonio.id)}
                  className='flex cursor-pointer items-center gap-1 rounded-xl border border-green-400 bg-green-100 px-4 py-2 font-medium text-green-700 transition hover:bg-green-200'
                >
                  <Edit className='h-4 w-4' /> Editar
                </button>
                <button
                  onClick={() => handleDelete && handleDelete(testimonio.id)}
                  className='flex cursor-pointer items-center gap-1 rounded-xl border border-red-400 bg-red-100 px-4 py-2 font-medium text-red-700 transition hover:bg-red-200'
                >
                  <Trash2 className='h-4 w-4' /> Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
