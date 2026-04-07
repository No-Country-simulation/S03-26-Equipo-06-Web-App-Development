'use client'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { Testimonio } from '@/types/testimonio'
import { toast } from 'react-toastify'
import { PublicacionCardPublicalSkeleton } from '@/app/components/ui/skeletors/skeletor'
import InfoCardPublica from './components/testimonios/publicacion-info-publica'
const PublicacionCardPublica = dynamic<TestimonialCardProps>(
  () => import('@/app/components/testimonios/card-publica').then(mod => mod.PublicacionCardPublica),
  { ssr: false }
)

const API_URL = process.env.NEXT_PUBLIC_API_URL

type TestimonialCardProps = {
  data: Testimonio[]
  onSelect: (item: Testimonio) => void
}
export default function Testimonios() {
  const [data, setData] = useState<Testimonio[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Testimonio | null>(null)

  useEffect(() => {
    const fetchTestimonios = async () => {
      try {
        const res = await fetch(`${API_URL}/api/testimonios`)
        const json = await res.json()
        const result: Testimonio[] = json.data
        //solo los publicados
        const publicados = result.filter(item => item.estado.toLowerCase() === 'publicado')
        setData(publicados)
        setLoading(false)
      } catch (error) {
        console.error('Error al traer testimonios:', error)
        toast.error('No se pudieron cargar las publicaciones. Intente nuevamente más tarde.')
      }
    }

    fetchTestimonios()
  }, [])

//volver atras
  useEffect(() => {
    const handlePopState = () => {
      setSelected(null)
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  //aca guardo el historial
  const handleSelect = (item: Testimonio) => {
    window.history.pushState({ testimonio: item.id }, '')
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
