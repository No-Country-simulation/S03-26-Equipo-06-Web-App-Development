'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Testimonio } from '@/types/nuevo-testimonio'
import { Undo2 } from 'lucide-react'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { getCategoriaStyle } from '@/utils/estilos'

type Comentario = {
  id: number
  contenido: string
  fecha_comentario?: string | Date
}

type Props = {
  data: Testimonio
}

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function InfoCardPublica({ data }: Props) {
  const router = useRouter()
  // post
  const [comentario, setComentario] = useState('')
  const [loading, setLoading] = useState(false)
  // comentarios
  const [comentarios, setComentarios] = useState<Comentario[]>(data.comentarios ?? [])

  const getEmbedUrl = (url: string | null) => {
    if (!url) return null
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/)
    return match ? `https://www.youtube.com/embed/${match[1]}` : url
  }

  // comentario
  const enviarComentario = async () => {
    const token = localStorage.getItem('token')

    if (!token) {
      toast.warning('Debes iniciar sesión para comentar')
      return
    }

    if (!comentario.trim()) {
      toast.error('Escribe un comentario')
      return
    }

    try {
      setLoading(true)

      const res = await fetch(`${API_URL}/api/comentar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          testimonio_id: data.id_testimonio,
          contenido: comentario,
        }),
      })

      if (!res.ok) {
        const text = await res.text()
        throw new Error(text)
      }

      toast.success('Comentario enviado')

      setComentarios(prev => [...prev,{id: Date.now(),contenido: comentario,},])

      setComentario('')
    } catch (error) {
      console.error(error)
      toast.error('Error al comentar')
    } finally {
      setLoading(false)
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
        <div className='relative mx-auto w-full rounded-2xl border border-gray-100 bg-white/80 p-5 shadow-sm backdrop-blur-sm sm:p-6 md:max-w-5xl'>
          {/* categoria */}
          <div className='absolute top-4 right-4 text-[12px] text-gray-600'>
            <span className='mr-1'>Categoria -</span>
            <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${getCategoriaStyle(data.categoria?.nombre)}`}>
              {data.categoria?.nombre ?? 'Sin categoría'}
            </span>
          </div>

          {/* titulo */}
          <div className='mb-6'>
            <h2 className='text-xl font-semibold text-gray-900 sm:text-2xl'>{data.titulo}</h2>
          </div>

          {/* contenido */}
          <div className='flex flex-col gap-6 md:flex-row'>
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
                  <Image src={data.imagen_url} alt={data.titulo || 'imagen'} fill className='object-cover'/>
                </div>
              ) : null}
            </div>

            <div className='flex w-full flex-col justify-between md:w-1/2'>
              <p className='text-sm text-gray-700 sm:text-[15px]'>{data.contenido}</p>

              <div className='mt-5 flex justify-between'>
                <div className='flex flex-wrap gap-2'>
                  <p className='px-2 py-1 text-xs font-semibold text-gray-500'>Tags:</p>

                  {data.tags?.map((tag, index) => (
                    <span key={`${tag.id_tag ?? tag.nombre}-${index}`} className='rounded bg-gray-200 px-2 py-1 text-xs text-gray-700'>
                      #{tag.nombre}
                    </span>
                  ))}
                </div>

                <p className='text-xs text-gray-400'>Publicado {data.fecha_creacion ? new Date(data.fecha_creacion).toLocaleDateString() : ''}</p>
              </div>
            </div>
          </div>

          {/* comentario input */}
          <div className='mt-8 border-t border-gray-100 pt-5'>
            <div className='w-full max-w-xl'>
              <textarea
                value={comentario}
                onChange={e => setComentario(e.target.value)}
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
                onClick={enviarComentario}
                disabled={loading}
                className='cursor-pointer rounded-lg bg-blue-500 px-4 py-1.5 text-xs text-white hover:bg-blue-600 active:scale-95'
              >
                {loading ? 'Enviando...' : 'Comentar'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/*render comentarios*/}
      <div className='mt-6 space-y-4'>
        {comentarios.length === 0 ? (
          <p className='text-xs text-gray-400'>No hay comentarios aún</p>
        ) : (
          comentarios.map(c => (
            <div key={c.id} className='flex items-start gap-3'>
              {/* avatar */}
              <div className='flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-blue-400 text-xs font-semibold text-white shadow-sm'>
                U
              </div>

              {/* bubble */}
              <div className='max-w-[85%] rounded-2xl bg-gray-100 px-4 py-2 shadow-sm transition hover:bg-gray-200'>
                {/* contenido */}
                <p className='text-sm text-gray-800'>{c.contenido}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  )
}
