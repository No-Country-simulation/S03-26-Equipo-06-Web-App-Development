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
        const res = await fetch(`${API_URL}/api/testimonios`)
        if (!res.ok) {
          throw new Error(`Error ${res.status}`)
        }
        const json = await res.json()
        // Date a string
        const result: Testimonio[] = (json.data as Testimonio[]).map(item => ({
          ...item,
          fecha_creacion: item.fecha_creacion ? new Date(item.fecha_creacion) : null,
        }))

        const publicados = result.filter(item => item.estado?.toLowerCase() === 'publicado')

        setData(publicados)
      } catch (error) {
        console.error('Error al traer testimonios:', error)
        toast.error('No se pudieron cargar las publicaciones.')
      } finally {
        setLoading(false)
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
