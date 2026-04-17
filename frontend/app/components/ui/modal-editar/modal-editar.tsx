'use client'

import { X } from 'lucide-react'
import { EditForm } from '@/types/editar-testimonio'

type Props = {
  isOpen: boolean
  onClose: () => void
  editForm: EditForm
  setEditForm: React.Dispatch<React.SetStateAction<EditForm>>
  onSave: () => void
  loading?: boolean
}

export default function ModalEditarTestimonio({ isOpen, onClose, editForm, setEditForm, onSave, loading }: Props) {
  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm'>
      <div className='w-full max-w-lg overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl'>
        {/* HEADER */}
        <div className='flex items-center justify-between bg-blue-100 px-5 py-4'>
          <h2 className='text-lg font-semibold text-gray-800'>Editar testimonio</h2>

          <button onClick={onClose} className='cursor-pointer rounded-full p-1 transition hover:bg-gray-200'>
            <X className='h-5 w-5 text-gray-600' />
          </button>
        </div>

        {/* FORM */}
        <div className='flex max-h-[65vh] flex-col gap-3 overflow-y-auto p-5'>
          <input
            type='text'
            placeholder='Título'
            value={editForm.titulo}
            onChange={e => setEditForm(prev => ({ ...prev, titulo: e.target.value }))}
            className='w-full rounded-md border border-gray-300 p-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
          />

          <textarea
            placeholder='Contenido'
            value={editForm.contenido}
            onChange={e => setEditForm(prev => ({ ...prev, contenido: e.target.value }))}
            className='h-28 w-full resize-none rounded-md border border-gray-300 p-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
          />

          <select
            value={editForm.categoria}
            onChange={e =>
              setEditForm(prev => ({...prev,
                categoria: Number(e.target.value),
              }))
            }
            className='w-full rounded-md border border-gray-300 p-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
          >
            <option value=''>Seleccionar categoría</option>
            <option value={1}>Producto</option>
            <option value={2}>Evento</option>
            <option value={3}>Cliente</option>
            <option value={4}>Industria</option>
          </select>

          <input
            type='text'
            placeholder='URL de imagen'
            value={editForm.imagen_url}
            onChange={e => setEditForm(prev => ({ ...prev, imagen_url: e.target.value }))}
            className='w-full rounded-md border border-gray-300 p-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
          />

          <input
            type='text'
            placeholder='URL de video (YouTube)'
            value={editForm.video_url}
            onChange={e => setEditForm(prev => ({ ...prev, video_url: e.target.value }))}
            className='w-full rounded-md border border-gray-300 p-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
          />

          {/* ESTADO */}
          <select
            value={editForm.estado}
            onChange={e => setEditForm(prev => ({ ...prev, estado: e.target.value }))}
            className='w-full rounded-md border border-gray-300 bg-white p-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
          >
            <option value='pendiente'> Pendiente</option>
            <option value='publicado'> Publicado</option>
            <option value='rechazado'> Rechazado</option>
          </select>
        </div>

        {/* ACTIONS */}
        <div className='flex justify-end gap-2 border-t bg-gray-50 px-5 py-4'>
          <button
            onClick={onClose}
            className='cursor-pointer rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-100'
          >
            Cancelar
          </button>

          <button
            onClick={onSave}
            disabled={loading}
            className='cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50'
          >
            {loading ? 'Guardando...' : 'Guardar cambios'}
          </button>
        </div>
      </div>
    </div>
  )
}
