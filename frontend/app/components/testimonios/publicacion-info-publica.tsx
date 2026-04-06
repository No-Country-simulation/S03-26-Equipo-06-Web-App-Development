'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Testimonio } from '@/types/testimonio'
import { Undo2 } from 'lucide-react'
import { toast } from 'react-toastify'
import { useState } from 'react'

export default function InfoCardPublica({ data }: { data: Testimonio }) {
    const router = useRouter()
    const [authenticado,setAuthenticado]=useState(true);
  const getEmbedUrl = (url: string) => {
    if (!url) return null
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/)
    return match ? `https://www.youtube.com/embed/${match[1]}` : url
  }

 const authenticacion=()=>{
    if (authenticado) {
      toast.success('Se publico con exito!')
    } else {
      toast.error('Debe Registrarse para publicar!')
    }
 } 

  return (
    <>
      {/* BOTÓN BACK */}
      <button
        onClick={() => router.back()}
        className='z-60 absolute top-19 right-6 cursor-pointer rounded-md border border-gray-200 bg-white/70 px-2 py-1 text-sm text-gray-600 backdrop-blur transition hover:bg-white'
      >
        <Undo2 size={16} />
      </button>

      <div className='mt-10 mb-20 w-full px-4 sm:px-6 md:px-0'>
        {/* CARD */}
        <div className='mx-auto w-full rounded-2xl border border-gray-100 bg-white/80 p-5 shadow-sm backdrop-blur-sm sm:p-6 md:max-w-5xl'>
          {/* HEADER */}
          <div className='mb-6 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
            <div>
              <h2 className='text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl'>{data.titulo}</h2>
              <p className='mt-1 text-sm text-gray-500'>{data.autor}</p>
            </div>
          </div>

          {/* CONTENIDO */}
          <div className='flex flex-col gap-6 md:flex-row'>
            {/* VIDEO / IMAGEN */}
            <div className='w-full md:w-1/2'>
              {data.video_url ? (
                <div className='relative aspect-video w-full overflow-hidden rounded-xl border border-gray-100'>
                  <iframe
                    src={getEmbedUrl(data.video_url) || ''}
                    title={data.titulo}
                    className='absolute top-0 left-0 h-full w-full'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                    allowFullScreen
                  />
                </div>
              ) : data.imagen_url ? (
                <div className='relative h-56 w-full overflow-hidden rounded-xl border border-gray-100 sm:h-64'>
                  <Image src={data.imagen_url} alt={data.titulo} fill className='object-cover' />
                </div>
              ) : null}
            </div>

            {/* DESCRIPCIÓN */}
            <div className='flex w-full flex-col justify-between md:w-1/2'>
              {/* TEXTO */}
              <p className='text-sm leading-relaxed text-gray-700 sm:text-[15px]'>{data.contenido}</p>

              {/* FOOTER */}
              <div className='mt-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between'>
                {/* IZQUIERDA */}
                <div>
                  <p className='text-sm text-gray-600'>
                    <span className='font-medium text-gray-800'>Categoría:</span> {data.categoria}
                  </p>

                  {data.tags.length > 0 && (
                    <div className='mt-2 flex flex-wrap gap-2'>
                      {data.tags.map((tag, i) => (
                        <span key={i} className='rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-[11px] text-gray-600'>
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* DERECHA */}
                <p className='text-xs text-gray-400 sm:whitespace-nowrap'>{new Date(data.fecha_creacion).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* COMENTAR */}
          <div className='mt-8 border-t border-gray-100 pt-5'>
            {/* textarea */}
            <div className='w-full max-w-xl'>
              <textarea
                placeholder='Escribe un comentario...'
                rows={1}
                onInput={(e: React.FormEvent<HTMLTextAreaElement>) => {
                  const target = e.currentTarget
                  target.style.height = 'auto'
                  target.style.height = target.scrollHeight + 'px'
                }}
                className='w-full resize-none border-b border-gray-200 bg-transparent px-1 py-2 text-sm text-gray-700 transition outline-none placeholder:text-gray-400 focus:border-blue-400'
              />
            </div>

            {/* botón */}
            <div className='mx-auto mt-3 flex w-full max-w-xl justify-end'>
              <button
                onClick={authenticacion}
                className='cursor-pointer rounded-full bg-blue-500 px-4 py-1.5 text-xs font-medium text-white transition hover:bg-blue-600 active:scale-95'
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
