'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { Testimonio } from '@/types/nuevo-testimonio'
import { toast } from 'react-toastify'
import { PublicacionCardPublicalSkeleton } from '@/app/components/ui/skeletors/skeletor'
import InfoCardPublica from './components/testimonios/publicacion-info-publica'

const PublicacionCardPublica = dynamic(() => import('@/app/components/testimonios/card-publica').then(mod => mod.PublicacionCardPublica), {
  ssr: false,
})

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function Testimonios() {
  const [data, setData] = useState<Testimonio[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Testimonio | null>(null)

  useEffect(() => {
    const fetchTestimonios = async () => {
      try {
        const res = await fetch(`${API_URL}/api/testimonios`, { cache: 'no-store' })
        const json = await res.json()
        const raw = Array.isArray(json?.data) ? json.data : []
        const result: Testimonio[] = raw
          .map((item: Testimonio) => ({
            ...item,
            fecha_creacion: item.fecha_creacion ? new Date(item.fecha_creacion) : null,
            tags: item.tags ?? [],
          }))
          .sort((a: Testimonio, b: Testimonio) => {
            const dateA = a.fecha_creacion ? new Date(a.fecha_creacion).getTime() : 0
            const dateB = b.fecha_creacion ? new Date(b.fecha_creacion).getTime() : 0

            return dateB - dateA
          })
        
        setData(result)
        setLoading(false)
      } catch (error) {
        console.error('Error al traer testimonios:', error)
        toast.error('No se pudieron cargar las publicaciones.')
      } 
    }

    fetchTestimonios()
  }, [])

  useEffect(() => {
    const handlePopState = () => setSelected(null)

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const handleSelect = (item: Testimonio) => {
    window.history.pushState({ id: item.id_testimonio }, '')
    setSelected(item)
  }

  return (
    <div className='min-h-screen bg-linear-to-tr from-[#f8fafc] via-[#eef2f6] to-[#f8fafc] px-6 pt-10 pb-20'>
      <div className='mx-auto max-w-6xl'>
        {loading ? (
          <PublicacionCardPublicalSkeleton />
        ) : selected ? (
          <InfoCardPublica data={selected} />
        ) : (
          <PublicacionCardPublica data={data} onSelect={handleSelect} />
        )}
      </div>
    </div>
  )
}
