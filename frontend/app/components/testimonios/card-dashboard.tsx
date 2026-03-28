'use client'
import { Trash2, Edit, Eye } from 'lucide-react'
import { Testimonio } from '@/types/testimonio'
import Image from 'next/image'


interface Props {
  testimonios: Testimonio[]
  handleDelete?: (id: number) => void
  handleEdit?: (id: number) => void
  handleView?: (id: number) => void
}

export function TestimonialCardDashboard({ testimonios}: Props) {
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
    <div className='overflow-x-auto my-15'>
       
          {/* Tabla para pantallas md+*/}
          <table className='lg:max-w-7xl m-auto hidden table-auto border-collapse rounded-xl bg-white/30 shadow-md backdrop-blur-md md:table md:max-w-3xl'>
            <thead>
              <tr className='border-b border-gray-300 bg-gray-100/50'>
                <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700'>Autor</th>
                <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700'>Estado</th>
                <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700'>Categoría / Tags</th>
                <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700'>Fecha</th>
                <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700'>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {testimonios.map(testimonio => (
                <tr key={testimonio.id} className='border-b border-gray-200 transition hover:bg-gray-50'>
                  <td className='flex items-center gap-3 px-6 py-4'>
                    <div className='h-12 w-12 shrink-0'>
                      <Image
                        src={testimonio.imagen_url || 'https://via.placeholder.com/120'}
                        alt={testimonio.titulo}
                        className='h-12 w-12 rounded-full border border-gray-300 object-cover'
                        height={48}
                        width={48}
                      />
                    </div>
                    <span className='font-medium text-gray-900'>{testimonio.titulo}</span>
                  </td>
                  <td className='px-6 py-4'>
                    <span className={`rounded-md px-2 py-1 text-sm font-medium ${getEstadoColor(testimonio.estado)}`}>{testimonio.estado}</span>
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-700'>
                    <div>
                      <span className='font-medium'>Categoría: </span>
                      {testimonio.categoria}
                    </div>
                    {testimonio.tags.length > 0 && <div className='text-xs text-gray-500'>Tags: {testimonio.tags.join(', ')}</div>}
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-500'>{testimonio.fecha_creacion}</td>
                  <td className='flex gap-2 px-6 py-4'>
                    <button className='flex items-center gap-1 rounded-md border border-blue-400 bg-blue-100 px-3 py-1 text-sm text-blue-700 transition hover:bg-blue-200'>
                      <Eye className='h-4 w-4' /> Ver
                    </button>
                    <button className='flex items-center gap-1 rounded-md border border-green-400 bg-green-100 px-3 py-1 text-sm text-green-700 transition hover:bg-green-200'>
                      <Edit className='h-4 w-4' /> Editar
                    </button>
                    <button className='flex items-center gap-1 rounded-md border border-red-400 bg-red-100 px-3 py-1 text-sm text-red-700 transition hover:bg-red-200'>
                      <Trash2 className='h-4 w-4' /> Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Cards para móviles sm */}
          <div className='flex flex-col gap-6 px-4 py-6 md:hidden'>
            {testimonios.map(testimonio => (
              <div
                key={testimonio.id}
                className='flex flex-col rounded-2xl border border-gray-200 bg-white/50 p-4 shadow-md backdrop-blur-md transition hover:scale-[1.02] hover:shadow-xl'
              >
                <div className='flex items-center gap-3'>
                  <Image
                    src={testimonio.imagen_url || 'https://via.placeholder.com/120'}
                    alt={testimonio.titulo}
                    className='h-12 w-12 rounded-full border border-gray-300 object-cover'
                    height={48}
                    width={48}
                  />
                  <div>
                    <h2 className='font-medium text-gray-900'>{testimonio.titulo}</h2>
                    <span className={`rounded-md px-2 py-1 text-xs font-medium ${getEstadoColor(testimonio.estado)}`}>{testimonio.estado}</span>
                  </div>
                </div>
                <div className='mt-2 text-sm text-gray-700'>
                  <div>
                    <span className='font-medium'>Categoría: </span>
                    {testimonio.categoria}
                  </div>
                  {testimonio.tags.length > 0 && <div className='text-xs text-gray-500'>Tags: {testimonio.tags.join(', ')}</div>}
                  <div className='mt-1 text-xs text-gray-400'>{testimonio.fecha_creacion}</div>
                </div>
                <div className='mt-3 flex flex-wrap gap-2'>
                  <button className='flex items-center gap-1 rounded-md border border-blue-400 bg-blue-100 px-3 py-1 text-sm text-blue-700 transition hover:bg-blue-200'>
                    <Eye className='h-4 w-4' /> Ver
                  </button>
                  <button className='flex items-center gap-1 rounded-md border border-green-400 bg-green-100 px-3 py-1 text-sm text-green-700 transition hover:bg-green-200'>
                    <Edit className='h-4 w-4' /> Editar
                  </button>
                  <button className='flex items-center gap-1 rounded-md border border-red-400 bg-red-100 px-3 py-1 text-sm text-red-700 transition hover:bg-red-200'>
                    <Trash2 className='h-4 w-4' /> Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
    </div>
  )
}
