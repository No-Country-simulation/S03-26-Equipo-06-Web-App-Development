'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import CardTestimonio from '@/app/components/testimonios/publicacion-info-Dashboard'
import CardTestimonioSkeleton from '@/app/components/ui/skeletors/skeletor-detalles'

//const API_URL = process.env.NEXT_PUBLIC_API_URL

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
    //(Datos solo de prueba)
    const fakeData: Testimonio = {
      id: '123',
      autor: 'Juan Pérez',
      titulo: 'Excelente servicio, muy recomendable',
      contenido:
        'Tuve una muy buena experiencia. El equipo fue atento, profesional y resolvió todo de forma rápida y clara. Me sentí acompañado en todo el proceso y el resultado final cumplió con lo esperado. Sin dudas, lo recomiendo por su compromiso y calidad.',
      categoria: 'Clientes',
      tags: ['servicio', 'calidad', 'recomendado'],
      estado: 'APROBADO',
      imagen_url: 'https://images.unsplash.com/photo-1529336953121-ad5a0d43d0d2',
      video_url: 'https://www.youtube.com/embed/SBh34m-6hIg?si=dvPVFsqSLDww1mKl',
      fecha_creacion: '2026-03-30T10:00:00Z',
    }

    //fetc
    setTimeout(() => {
      setData(fakeData)
      setLoading(false)
    }, 500)

    //
    /*
    const fetchTestimonio = async () => {
      try {
        const res = await fetch(`${API_URL}/api/testimonios/${id}`)
        const json = await res.json()
        const result: Testimonio[] = json.data
        setData(result)
      } catch (error) {
        console.error('Error fetch:', error)
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchTestimonio()
    */
  }, [id])

  if (loading) return <CardTestimonioSkeleton />
  if (!data) return <p className='p-6'>No encontrado</p>

  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      <CardTestimonio data={data} />
    </div>
  )
}
