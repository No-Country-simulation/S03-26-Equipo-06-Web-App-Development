'use client'
import { Dispatch, SetStateAction, FormEvent, useState } from 'react'
import { DatosForm } from '@/types/form'
import {  Link as LinkIcon, Video } from 'lucide-react'

type Props = {
  datos: DatosForm
  setDatos: Dispatch<SetStateAction<DatosForm>>
  AgregarTestimonio: (e: FormEvent) => void
  loading: boolean
}

const categorias = [
  { id: 1, nombre: 'Producto' },
  { id: 2, nombre: 'Evento' },
  { id: 3, nombre: 'Cliente' },
  { id: 4, nombre: 'Industria' },
]

const tagOptions = [
  { id: 1, label: 'Fullstack' },
  { id: 2, label: 'Empleo' },
  { id: 3, label: 'Curso' },
  { id: 4, label: 'Carrera' },
  { id: 5, label: 'Universidad' },
  { id: 6, label: 'Instituto' },
  { id: 7, label: 'Terciario' },
]

export default function FormularioCreacionTestimonios({ datos, setDatos, AgregarTestimonio, loading }: Props) {
  const [contador, setContador] = useState(0)
  const maxCaracteres = 300

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    setDatos({...datos,[name]: name === 'categoria'? value === '' ? '': Number(value) : value,})


    if (name === 'contenido') {
      setContador(value.length)
    }
  }

  return (
    <form onSubmit={AgregarTestimonio} className='mt-10 mb-21 w-full p-6 text-black lg:ml-35 lg:max-w-5xl'>
      <div>
        <label className='text-sm font-medium'>Título</label>
        <input
          type='text'
          name='titulo'
          value={datos.titulo}
          onChange={handleChange}
          className='w-full rounded border border-slate-600 px-3 py-2 text-gray-400 transition outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
        />
      </div>

      {/* contenido */}
      <div className='relative'>
        <label className='text-sm font-medium'>Contenido</label>
        <textarea
          name='contenido'
          value={datos.contenido}
          onChange={handleChange}
          rows={5}
          maxLength={maxCaracteres}
          className='w-full rounded border border-slate-600 px-3 pb-6 text-gray-400 transition outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
        />
        <span className='absolute right-2 bottom-2 text-xs text-gray-500'>{maxCaracteres - contador} caracteres restantes</span>
      </div>

      {/* fila 2 */}
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        <div>
          <label className='text-sm font-medium'>Categoría</label>
          <select
            name='categoria'
            value={datos.categoria}
            onChange={handleChange}
            className='w-full rounded border border-slate-600 px-3 py-2 text-black transition outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
          >
            <option value=''>Seleccionar categoría</option>
            {categorias.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className='text-sm font-medium '>Tags</label>
          <div className='grid grid-cols-3 lg:grid-cols-4 gap-2'>
            {(tagOptions ?? []).map(tag => {
              const safeTags = Array.isArray(datos.tags) ? datos.tags : []

              return (
                <label key={tag.id} className='flex items-center gap-2 text-sm'>
                  <input
                    type='checkbox'
                    checked={safeTags.includes(tag.id)}
                    onChange={() => {
                      setDatos(prev => {
                        const current = Array.isArray(prev.tags) ? prev.tags : []

                        const exists = current.includes(tag.id)

                        const updated = exists ? current.filter(t => t !== tag.id) : [...current, tag.id]

                        
                        return {
                          ...prev,
                          tags: [...new Set(updated)],
                        }
                      })
                    }}
                  />
                  {tag.label}
                </label>
              )
            })}
          </div>
        </div>
      </div>

      {/* fila 3 */}
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        {/* Video */}
        <div className='mt-5 rounded-lg border border-blue-400 bg-blue-50 p-4 text-blue-800 shadow-sm'>
          <label className='mb-1 flex items-center gap-2 text-sm font-semibold'>
            <Video size={16} />
            Video (URL o archivo)
          </label>

          <input
            type='text'
            name='video_url'
            value={datos.video_url}
            onChange={handleChange}
            placeholder='https://youtube.com/...'
            className='mt-7 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-gray-700 transition outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
          />

          <div className='mt-7 flex items-center gap-2 text-xs text-gray-500'></div>
        </div>

        {/* Imagen */}
        <div className='rounded-lg border border-green-400 bg-green-50 p-4 text-green-800 shadow-sm md:mt-5'>
          <label className='mb-1 flex items-center gap-2 text-sm font-semibold'>
            <LinkIcon size={16} />
            Imagen (URL o archivo)
          </label>

          <input
            type='text'
            name='imagen_url'
            value={datos.imagen_url}
            onChange={handleChange}
            placeholder='https://ejemplo.com/imagen.jpg'
            className='mt-7 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-gray-700 transition outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
          />
        </div>
      </div>

      {/* fila 4 */}
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        <div>
          <label className='text-sm font-medium'>Estado</label>
          <select
            name='estado'
            value={datos.estado}
            onChange={handleChange}
            className='w-full rounded border border-slate-600 px-3 py-2 text-black transition outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
          >
            <option value=''>Seleccionar estado</option>
            <option value='PENDIENTE'>Pendiente</option>
            <option value='PUBLICADO'>Publicado</option>
            <option value='RECHAZADO'>Rechazado</option>
          </select>
        </div>
      </div>

      {/* botón */}
      <button
        type='submit'
        disabled={loading}
        className={`mt-5 w-full cursor-pointer rounded-lg py-2 font-semibold text-white transition ${
          loading ? 'cursor-not-allowed bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {loading ? 'Publicando...' : 'Publicar'}
      </button>
    </form>
  )
}
