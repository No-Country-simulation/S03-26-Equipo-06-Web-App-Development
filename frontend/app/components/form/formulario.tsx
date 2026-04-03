'use client'
import { Dispatch, SetStateAction, FormEvent } from 'react'
import { DatosForm } from '@/types/form'

type Props = {
  datos: DatosForm
  setDatos: Dispatch<SetStateAction<DatosForm>>
  AgregarTestimonio: (e: FormEvent) => void
  loading: boolean
}
export default function FormularioCreacionTestimonios({ datos, setDatos, AgregarTestimonio, loading }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setDatos({ ...datos, [e.target.name]: e.target.value })
  }

  return (
    <form onSubmit={AgregarTestimonio} className='mt-10 mr-2 mb-21 ml-18 text-black lg:ml-35 lg:max-w-5xl'>
      {/* fila 1 */}
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        <div>
          <label className='text-sm font-medium'>Autor</label>
          <input
            type='text'
            name='autor'
            value={datos.autor}
            onChange={e => setDatos({ ...datos, autor: e.target.value })}
            className='w-full rounded border border-slate-600 px-3 py-2 text-gray-400 transition outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
          />
        </div>

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
      </div>

      {/* contenido */}
      <div>
        <label className='text-sm font-medium'>Contenido</label>
        <textarea
          name='contenido'
          value={datos.contenido}
          onChange={handleChange}
          rows={4}
          className='w-full rounded border border-slate-600 px-3 py-2 text-gray-400 transition outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
        />
      </div>

      {/* fila2 */}
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        <div>
          <label className='text-sm font-medium'>Categoría</label>
          <input
            type='text'
            name='categoria'
            value={datos.categoria}
            onChange={handleChange}
            className='w-full rounded border border-slate-600 px-3 py-2 text-gray-400 transition outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
          />
        </div>

        <div>
          <label className='text-sm font-medium'>Tags</label>
          <input
            type='text'
            name='tags'
            value={datos.tags}
            onChange={handleChange}
            className='w-full rounded border border-slate-600 px-3 py-2 text-gray-400 transition outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
          />
        </div>
      </div>

      {/* fila 3 */}
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
            <option value='APROBADO'>Publicado</option>
            <option value='RECHAZADO'>Rechazado</option>
          </select>
        </div>

        <div>
          <label className='text-sm font-medium'>Imagen URL</label>
          <input
            type='text'
            name='imagen_url'
            value={datos.imagen_url}
            onChange={handleChange}
            className='w-full rounded border border-slate-600 px-3 py-2 text-gray-400 transition outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
          />
        </div>
      </div>

      {/* fila 4 */}
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        <div>
          <label className='text-sm font-medium'>Video URL</label>
          <input
            type='text'
            name='video_url'
            value={datos.video_url}
            onChange={handleChange}
            className='w-full rounded border border-slate-600 px-3 py-2 text-gray-400 transition outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
          />
        </div>
      </div>

      {/*botón*/}
      <button
        type='submit'
        disabled={loading}
        className={`mt-5 w-full cursor-pointer rounded-lg py-2 font-semibold text-white transition ${loading ? 'cursor-not-allowed bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
      >
        {loading ? 'Publicando...' : 'Publicar Testimonio'}
      </button>
    </form>
  )
}
