'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { Testimonio } from '@/types/testimonio'
import { TestimonialSkeleton } from '@/app/components/ui/skeletor-cardTestimonio/skeletor'

type Props = {
  testimonios: Testimonio[]
  loading: boolean
}

const TestimonialCardDashboard = dynamic<Props>(
  () =>
    import('@/app/components/testimonios/card-dashboard').then(mod => mod.TestimonialCardDashboard),
  { ssr: false }
)

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function Testimonios() {
  const [data, setData] = useState<Testimonio[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTestimonios = async () => {
      try {
        const res = await fetch(`${API_URL}/api/testimonios`)
        const result = await res.json()
        setData(result)
      } catch (error) {
        console.error('Error al traer testimonios:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonios()
  }, [])

  return (
    <div className='min-h-screen bg-linear-to-tr from-[#f8fafc] via-[#eef2f6] to-[#f8fafc]'>
      <h1 className='pt-13 pb-18 text-center text-2xl font-bold text-gray-800'>Testimonios</h1>

      {loading ? (<TestimonialSkeleton />) : (<TestimonialCardDashboard testimonios={data} loading={loading} />)}
    </div>
  )
}
