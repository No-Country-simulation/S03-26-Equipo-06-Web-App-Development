'use client'

import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import RenderHome from '../components/testimonios/card-home'
import { HomeSkeleton } from '../components/ui/skeletors/skeletor-home'
import { Testimonio } from '@/types/nuevo-testimonio'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function Home() {
  const [data, setData] = useState<Testimonio[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_URL}/api/testimonios`)
        if (!res.ok) {
          const text = await res.text()
          console.error('STATUS:', res.status)
          console.error('RESPONSE:', text)
          throw new Error('Error en API')
        }
        const json = await res.json()
        const result: Testimonio[] = Array.isArray(json.data) ? json.data : Array.isArray(json) ? json : []
        setData(result)
      } catch (error) {
        console.error(error)
        toast.error('Error al cargar el dashboard')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // stats
  const total = data.length
  const publicadas = data.filter(p => p.estado?.toUpperCase() === 'PUBLICADO').length
  const pendientes = data.filter(p => p.estado?.toUpperCase() === 'PENDIENTE').length
  const rechazadas = data.filter(p => p.estado?.toUpperCase() === 'RECHAZADO').length

  // últimas
  const ultimas = [...data].sort((a, b) => new Date(b.fecha_creacion||"").getTime() - new Date(a.fecha_creacion||"").getTime()).slice(0, 15)

  if (loading) {
    return <HomeSkeleton />
  }

  return (
  
     
      <RenderHome
        router={router}
        data={data}
        ultimas={ultimas}
        total={total}
        publicadas={publicadas}
        pendientes={pendientes}
        rechazadas={rechazadas}
      />
    
  )
}
