'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Testimonio } from '@/types/testimonio'
import { Undo2 } from 'lucide-react'

export default function InfoCardDashboard({ data }: { data: Testimonio }) {
  const router = useRouter()

  const getEmbedUrl = (url: string) => {
    if (!url) return null
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/)
    return match ? `https://www.youtube.com/embed/${match[1]}` : url
  }

  return (
    <>
      
      <button
        onClick={() => router.back()}
        className='absolute top-18 sm:top-24 right-6 lg:right-10 cursor-pointer rounded-md py-3 px-2 text-sm text-gray-600'
      >
        <Undo2/>
      </button>
      <div className='mt-10 mb-20 w-full px-4 sm:px-6 md:px-0'>
        <div className='mx-auto w-full rounded-2xl border border-gray-200 bg-white p-4 shadow-md sm:p-6 md:max-w-5xl'>
          {/* HEADER */}
          <div className='mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'>
            <div>
              <h2 className='text-xl font-bold text-gray-900 sm:text-2xl'>{data.titulo}</h2>
              <p className='mt-1 text-sm text-gray-600 pt-2'>{data.autor}</p>
            </div>
          </div>

          {/* CONTENIDO */}
          <div className='flex flex-col gap-6 md:flex-row'>
            {/* VIDEO / IMAGEN */}
            <div className='w-full md:w-1/2'>
              {data.video_url ? (
                <div className='relative aspect-video w-full overflow-hidden rounded-xl'>
                  <iframe
                    src={getEmbedUrl(data.video_url) || ''}
                    title={data.titulo}
                    className='absolute top-0 left-0 h-full w-full'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                    allowFullScreen
                  />
                </div>
              ) : data.imagen_url ? (
                <div className='relative h-56 w-full overflow-hidden rounded-xl border sm:h-64'>
                  <Image src={data.imagen_url} alt={data.titulo} fill className='object-cover' />
                </div>
              ) : null}
            </div>

            {/* DESCRIPCIÓN */}
            <div className='flex w-full flex-col justify-between md:w-1/2'>
              {/* TEXTO */}
              <p className='text-sm leading-relaxed text-gray-800 sm:text-base'>{data.contenido}</p>

              {/* FILA FINAL */}
              <div className='mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between'>
                {/* IZQUIERDA */}
                <div>
                  <p className='text-sm font-semibold text-gray-700'>
                    Categoría: <span className='font-normal'>{data.categoria}</span>
                  </p>

                  {data.tags.length > 0 && (
                    <div className='mt-2 flex flex-wrap gap-2'>
                      {data.tags.map((tag, i) => (
                        <span key={i} className='rounded-full bg-blue-200 border-blue-400 px-3 py-1 text-xs text-gray-800'>
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* DERECHA */}
                <p className='text-xs text-gray-500 sm:whitespace-nowrap'>{new Date(data.fecha_creacion).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
