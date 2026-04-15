'use client'

import { useEffect, useRef, useState } from 'react'
import { Testimonio } from '@/types/nuevo-testimonio'
import Image from 'next/image'
import { ExpandableText } from '../ui/expanded-card'
import BotonCarrusel from '../ui/boton-carrusel'

type Props = {
  data: Testimonio[]
  onSelect: (item: Testimonio) => void
}

export function PublicacionCardPublica({ data, onSelect }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [indexActivo, setIndexActivo] = useState(0)

  useEffect(() => {
    if (data.length === 0) return

    const interval = setInterval(() => {
      setIndexActivo(prev => (prev + 1) % data.length)
    }, 5000)

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
      <div className='flex flex-col gap-5 px-2 py-4 sm:hidden'>
        {data.map(item => (
          <div key={item.id_testimonio} className='overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm'>
            <div className='relative h-44 w-full'>
              <Image src={item.imagen_url || '/testimoniales.webp'} alt={item.titulo || 'imagen'} fill className='object-cover' />
            </div>

            <div className='p-4'>
              <h2 className='text-base font-semibold text-gray-900'>{item.titulo}</h2>

              <div className='mt-2 text-sm text-gray-700'>
                <ExpandableText content={item.contenido || ''} />
              </div>

              <p className='mt-3 text-[11px] text-gray-400'>{item.fecha_creacion ? item.fecha_creacion.toLocaleDateString() : ''}</p>

              <button onClick={() => onSelect(item)} className='mt-4 w-full cursor-pointer rounded-lg bg-blue-500 py-2 text-sm text-white'>
                Ver publicación
              </button>
            </div>
          </div>
        ))}
      </div>

      {/*desktop*/}
      <div className='hidden gap-6 sm:flex'>
        {activo && (
          <div className='relative h-80 w-[45%] overflow-hidden rounded-xl shadow-md'>
            <Image src={activo.imagen_url || '/testimoniales.webp'} alt={activo.titulo || 'imagen'} fill className='object-cover' />

            <div className='absolute inset-0 bg-black/30' />

            <div className='absolute bottom-0 w-full p-6 text-white'>
              <h2 className='text-xl font-bold'>{activo.titulo}</h2>

              <div className='mt-2 max-w-md text-sm'>
                <ExpandableText content={activo.contenido || ''} />
              </div>

              <button onClick={() => onSelect(activo)} className='cursor-pointer mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white'>
                Ver publicación
              </button>
            </div>
          </div>
        )}

        <div className='relative w-[55%]'>
          <div ref={scrollRef} className='flex gap-5 overflow-x-auto px-8 pb-4'>
            {data.map((item, index) => {
              const isActive = index === indexActivo

              return (
                <div
                  key={item.id_testimonio}
                  onClick={() => setIndexActivo(index)}
                  className={`min-w-55 cursor-pointer rounded-xl border ${isActive ? 'border-blue-200 bg-white' : 'border-gray-200/60 bg-white/70'}`}
                >
                  <div className='relative h-32 w-full'>
                    <Image src={item.imagen_url || '/testimoniales.webp'} alt={item.titulo || 'imagen'} fill className='object-cover' />
                  </div>

                  <div className='p-3'>
                    <h2 className='text-sm font-medium text-gray-700'>{item.titulo}</h2>

                    <button
                      onClick={e => {
                        e.stopPropagation()
                        onSelect(item)
                      }}
                      className='mt-2 text-xs text-blue-500'
                    >
                      Ver más →
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          <BotonCarrusel scroll={scroll} />
        </div>
      </div>
    </>
  )
}
