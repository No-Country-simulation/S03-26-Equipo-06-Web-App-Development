'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Testimonio } from '@/types/nuevo-testimonio'
import { Undo2 } from 'lucide-react'
import { toast } from 'react-toastify'
import { useState } from 'react'

type Props = {
  data: Testimonio
}

export default function InfoCardPublica({ data }: Props) {
  const router = useRouter()
  const [authenticado] = useState(true)

  const getEmbedUrl = (url: string | null) => {
    if (!url) return null
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/)
    return match ? `https://www.youtube.com/embed/${match[1]}` : url
  }

  //prueba
  const authenticacion = () => {
    if (authenticado) {
      toast.success('Se publicó con éxito!')
    } else {
      toast.error('Debe registrarse para comentar!')
    }
  }

 return (
  <>
    <button
      onClick={() => router.back()}
      className='absolute top-19 right-10 z-50 cursor-pointer rounded-md px-2 py-1 text-gray-500 backdrop-blur transition md:top-25 md:right-22'
    >
      <Undo2 />
    </button>

    <div className='mt-10 mb-20 w-full px-4 sm:px-6 md:px-0'>
      <div className='mx-auto w-full rounded-2xl border border-gray-100 bg-white/80 p-5 shadow-sm backdrop-blur-sm sm:p-6 md:max-w-5xl'>
        
        {/* TITULO */}
        <div className='mb-6'>
          <h2 className='text-xl font-semibold text-gray-900 sm:text-2xl'>
            {data.titulo}
          </h2>

          
        </div>

        {/* CONTENIDO */}
        <div className='flex flex-col gap-6 md:flex-row'>

          {/* VIDEO / IMAGEN */}
          <div className='w-full md:w-1/2'>
            {data.video_url ? (
              <div className='relative aspect-video w-full overflow-hidden rounded-xl border'>
                <iframe
                  src={getEmbedUrl(data.video_url) || ''}
                  title={data.titulo || 'video'}
                  className='absolute top-0 left-0 h-full w-full'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                />
              </div>
            ) : data.imagen_url ? (
              <div className='relative h-56 w-full overflow-hidden rounded-xl border sm:h-64'>
                <Image
                  src={data.imagen_url}
                  alt={data.titulo || 'imagen'}
                  fill
                  className='object-cover'
                />
              </div>
            ) : null}
          </div>

          {/* DESCRIPCIÓN */}
          <div className='flex w-full flex-col justify-between md:w-1/2'>
            <p className='text-sm text-gray-700 sm:text-[15px]'>
              {data.contenido}
            </p>

            {/* TAGS */}
            {data.tags && data.tags.length > 0 && (
              <div className='mt-4 flex flex-wrap gap-2'>
                {data.tags.map((tag, i) => (
                  <span
                    key={i}
                    className='rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600'
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* FECHA */}
            <div className='mt-5 flex justify-end'>
              <p className='text-xs text-gray-400'>
                Publicado{' '}
                {data.fecha_creacion
                  ? new Date(data.fecha_creacion).toLocaleDateString()
                  : ''}
              </p>
            </div>
          </div>
        </div>

        {/* COMENTARIO */}
        <div className='mt-8 border-t border-gray-100 pt-5'>

          <div className='w-full max-w-xl'>
            <textarea
              placeholder='Escribe un comentario...'
              rows={1}
              onInput={(e: React.FormEvent<HTMLTextAreaElement>) => {
                const target = e.currentTarget
                target.style.height = 'auto'
                target.style.height = target.scrollHeight + 'px'
              }}
              className='w-full resize-none border-b border-gray-200 bg-transparent px-1 py-2 text-sm text-gray-700 outline-none placeholder:text-gray-400 focus:border-blue-400'
            />
          </div>

          <div className='mx-auto mt-3 flex w-full max-w-xl justify-end'>
            <button
              onClick={authenticacion}
              className='cursor-pointer rounded-lg bg-blue-500 px-4 py-1.5 text-xs text-white hover:bg-blue-600 active:scale-95'
            >
              Comentar
            </button>
          </div>
        </div>

      </div>
    </div>
  </>

  )
}
