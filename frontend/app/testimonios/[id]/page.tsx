'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import InfoCardDashboard from '@/app/components/testimonios/publicacion-info-Dashboard'
import CardTestimonioSkeleton from '@/app/components/ui/skeletors/skeletor-detalles'
import { Testimonio } from '@/types/nuevo-testimonio'

const API_URL = process.env.NEXT_PUBLIC_API_URL

type TestimonioAPI = {
  id_testimonio: number
  titulo: string | null
  contenido: string | null
  estado: string | null
  imagen_url: string | null
  video_url: string | null
  fecha_creacion: string | null
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
        const text = await res.text()
        console.error('RESPONSE:', text)
        throw new Error(`Error ${res.status}`)
      }

      const json = await res.json()

      //fechas correctamente
      const result: Testimonio[] = (json.data ?? []).map(
        (item: TestimonioAPI) => ({
          ...item,
          fecha_creacion: item.fecha_creacion
            ? new Date(item.fecha_creacion)
            : null,
        })
      )
      

      //id_testimonio
      const encontrado = result.find(
        (t) => String(t.id_testimonio) === String(id)
      )

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
        <InfoCardDashboard data={data} />
      </div>
    </div>
  )
}
