'use client'
import { Dispatch, SetStateAction, FormEvent, useState } from 'react'
import { DatosForm } from '@/types/form'
import { ImagePlus, Link as LinkIcon, Video, Upload } from 'lucide-react'

type Props = {
  datos: DatosForm
  setDatos: Dispatch<SetStateAction<DatosForm>>
  AgregarTestimonio: (e: FormEvent) => void
  loading: boolean
}

export default function FormularioCreacionTestimonios({ datos, setDatos, AgregarTestimonio, loading }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    setDatos({ ...datos, [name]: value })
    if (name === 'contenido') {
      setContador(value.length)
    }
  }
  const [contador, setContador] = useState(0)
  const maxCaracteres = 300

  return (
    <form onSubmit={AgregarTestimonio} className='mt-10 mb-21 w-full p-6 text-black lg:ml-35 lg:max-w-5xl'>
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
        {/*Video*/}
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
            className='w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-gray-700 transition outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
          />

          <div className='my-2 flex items-center gap-2 text-xs text-gray-500'>
            <span className='h-px w-full bg-gray-300' />
            o
            <span className='h-px w-full bg-gray-300' />
          </div>

          <label className='flex cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-gray-400 bg-white px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-100'>
            <Upload size={16} />
            Subir video desde tu dispositivo
            <input type='file' className='hidden' />
          </label>
        </div>
        {/*imagen*/}
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
            className='w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-gray-700 transition outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
          />

          <div className='my-2 flex items-center gap-2 text-xs text-gray-500'>
            <span className='h-px w-full bg-gray-300' />
            o
            <span className='h-px w-full bg-gray-300' />
          </div>

          <label className='flex cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-gray-400 bg-white px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-100'>
            <ImagePlus size={16} />
            Subir imagen desde tu dispositivo
            <input type='file' className='hidden' />
          </label>
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

      {/*botón*/}
      <button
        type='submit'
        disabled={loading}
        className={`mt-5 w-full cursor-pointer rounded-lg py-2 font-semibold text-white transition ${loading ? 'cursor-not-allowed bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
      >
        {loading ? 'Publicando...' : 'Publicar'}
      </button>
    </form>
  )
}
