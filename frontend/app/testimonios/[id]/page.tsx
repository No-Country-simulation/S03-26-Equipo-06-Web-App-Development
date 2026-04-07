'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import CardTestimonio from '@/app/components/testimonios/publicacion-info-Dashboard'
import CardTestimonioSkeleton from '@/app/components/ui/skeletors/skeletor-detalles'

const API_URL = process.env.NEXT_PUBLIC_API_URL

type Testimonio = {
  id: string
  autor: string
  titulo: string
  contenido: string
  categoria: string
  tags: string[]
  estado: string
  imagen_url: string | null
  video_url: string | null
  fecha_creacion: string
}

export default function TestimonioDetallePage() {
  const params = useParams()
  const id = Array.isArray(params.id) ? params.id[0] : params.id

  const [data, setData] = useState<Testimonio | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTestimonio = async () => {
      try {
        const res = await fetch(`${API_URL}/api/testimonios`, {
          cache: 'no-store',
        })

        if (!res.ok) {
          throw new Error('Error al obtener testimonios')
        }
        const result: Testimonio[] = await res.json()
        //testimonio por id
        const encontrado = result.find(t => String(t.id) === String(id))
        setData(encontrado || null)
      } catch (error) {
        console.error('Error fetch:', error)
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchTestimonio()
  }, [id])

  if (loading) return <CardTestimonioSkeleton />

  if (!data) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-gray-100'>
        <p className='text-gray-500'>No se encontró el testimonio</p>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-linear-to-tr from-[#f8fafc] via-[#eef2f6] to-[#f8fafc] px-6 pt-10 pb-20'>
      <div className='mx-auto max-w-5xl'>
        <CardTestimonio data={data} />
      </div>
    </div>
  )
}
