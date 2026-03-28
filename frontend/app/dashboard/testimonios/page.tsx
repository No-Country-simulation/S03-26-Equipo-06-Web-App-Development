'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { Testimonio } from '@/types/testimonio'
import { TestimonioSkeletonDashboard } from '@/app/components/ui/skeletor-cardTestimonio/skeletorCardDashboard'
type Props = {
  testimonios: Testimonio[]
  loading?: boolean
}

const TestimonialCardDashboard = dynamic<Props>(
  () =>
    import('@/app/components/testimonios/card-dashboard').then(mod => mod.TestimonialCardDashboard),
  { ssr: false }
)

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function TestimoniosDashboard() {
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
      {loading ? <TestimonioSkeletonDashboard /> : <TestimonialCardDashboard testimonios={data} />}
    </div>
  )
}
