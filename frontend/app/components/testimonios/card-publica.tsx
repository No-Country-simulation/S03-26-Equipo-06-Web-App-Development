'use client'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Testimonio } from '@/types/testimonio'
import Image from 'next/image'
import { ExpandableText } from '../ui/expanded-card'
import BotonCarrusel from '../ui/boton-carrusel'

type Props = {
  data: Testimonio[]
}

export function TestimonialCardPublica({ data }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [indexActivo, setIndexActivo] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const interval = setInterval(() => {
      setIndexActivo(prev => (prev + 1) % data.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [data.length])

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollRef.current
    if (!container) return

    container.scrollBy({
      left: direction === 'left' ? -260 : 260,
      behavior: 'smooth',
    })
  }

  const activo = data[indexActivo]

  return (
    <>
      {/*movil*/}
      <div className='flex flex-col gap-5 px-4 py-4 sm:hidden'>
        {data.map(item => (
          <div key={item.id} className='overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md'>
            {/*imagen*/}
            <div className='relative h-44 w-full'>
              <Image src={item.imagen_url || '/testimoniales.webp'} alt={item.titulo} fill className='object-cover' />
            </div>

            {/*contenido*/}
            <div className='p-4'>
              {/*categoria*/}
              <span className='mb-2 inline-block rounded-full bg-blue-50 px-3 py-1 text-[11px] font-medium text-blue-600'>{item.categoria}</span>
              {/*titulo*/}
              <h2 className='text-base leading-snug font-semibold text-gray-900'>{item.titulo}</h2>
              {/*autor*/}
              <p className='mt-1 text-xs text-gray-500'>— {item.autor}</p>
              {/*contenido*/}
              <div className='mt-2 text-sm text-gray-700'>
                <ExpandableText content={item.contenido} />
              </div>
              {/*tags*/}
              {item.tags.length > 0 && (
                <div className='mt-3 flex flex-wrap gap-2'>
                  {item.tags.map((tag, i) => (
                    <span key={i} className='rounded-full bg-gray-100 px-2 py-1 text-[10px] text-gray-600'>
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/*fecha*/}
              <p className='mt-3 text-[11px] text-gray-400'>{new Date(item.fecha_creacion).toLocaleDateString()}</p>
              {/*boton*/}
              <button
                onClick={() => router.push(`/testimonios/${item.id}`)}
                className='mt-4 w-full rounded-lg bg-blue-500 py-2 text-sm font-medium text-white transition hover:bg-blue-600'
              >
                Ver testimonio completo
              </button>
            </div>
          </div>
        ))}
      </div>

      {/*pantalla+sm*/}
      <div className='hidden gap-6 sm:flex'>
        {/*card grande*/}
        {activo && (
          <div className='relative h-80 w-[45%] overflow-hidden rounded-xl shadow-md'>
            <Image src={activo.imagen_url || '/testimoniales.webp'} alt={activo.titulo} fill className='object-cover' />
            {/* overlay*/}
            <div className='absolute inset-0 bg-black/30' />
            {/* contenido */}
            <div className='absolute bottom-0 w-full p-6 text-white'>
              <h2 className='text-xl font-bold'>{activo.titulo}</h2>
              <p className='text-sm text-gray-200'>— {activo.autor}</p>
              <div className='mt-2 max-w-md text-sm'>
                <ExpandableText content={activo.contenido} />
              </div>
              {/*detalle*/}
              <button
                onClick={() => router.push(`/testimonios/${activo.id}`)}
                className='mt-4 cursor-pointer rounded-md bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600'
              >
                Ver testimonio completo
              </button>
            </div>
          </div>
        )}

        {/*carrusel*/}
        <div className='relative w-[55%]'>
          {/*lista*/}
          <div ref={scrollRef} className='flex gap-5 overflow-x-auto px-8 pb-4'>
            {data.map((item, index) => {
              const isActive = index === indexActivo
              return (
                <div
                  key={item.id}
                  onClick={() => setIndexActivo(index)}
                  className={`group min-w-55 cursor-pointer overflow-hidden rounded-xl border transition-all duration-300 ${
                    isActive ? 'border-blue-200 bg-white shadow-sm' : 'border-gray-200/60 bg-white/70 hover:bg-white'
                  }`}
                >
                  {/*imagen*/}
                  <div className='relative h-32 w-full overflow-hidden'>
                    <Image
                      src={item.imagen_url || '/testimoniales.webp'}
                      alt={item.titulo}
                      fill
                      className={`object-cover transition duration-500 ${isActive ? 'scale-105' : 'group-hover:scale-105'}`}
                    />
                    <div className={`absolute inset-0 transition ${isActive ? 'bg-black/10' : 'bg-black/0 group-hover:bg-black/5'}`} />
                  </div>
                  {/*contenido*/}
                  <div className='p-3'>
                    <h2
                      className={`text-sm leading-snug transition ${
                        isActive ? 'font-semibold text-gray-900' : 'font-medium text-gray-700 group-hover:text-gray-900'
                      }`}
                    >
                      {item.titulo}
                    </h2>
                    <p className='mt-1 text-xs text-gray-400'>— {item.autor}</p>
                    {/*boton*/}
                    <button
                      onClick={e => {
                        e.stopPropagation()
                        router.push(`/testimonios/${item.id}`)
                      }}
                      className='mt-2 text-xs text-blue-500 hover:underline'
                    >
                      Ver más →
                    </button>
                    {/*indicador*/}
                    <div className={`mt-2 h-0.5 w-6 rounded-full transition-all ${isActive ? 'w-10 bg-blue-400' : 'bg-transparent'}`} />
                  </div>
                </div>
              )
            })}
          </div>
          {/* botones */}
          <BotonCarrusel scroll={scroll} />
        </div>
      </div>
    </>
  )
}
