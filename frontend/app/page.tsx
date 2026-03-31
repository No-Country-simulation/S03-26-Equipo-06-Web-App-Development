'use client'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { Testimonio } from '@/types/testimonio'
import { TestimonialSkeleton } from '@/app/components/ui/skeletor-cardTestimonio/skeletor'


const TestimonialCardPublica = dynamic<TestimonialCardProps>(
  () => import('@/app/components/testimonios/card-publica').then(mod => mod.TestimonialCardPublica),{ ssr: false });

type TestimonialCardProps = {
  data: Testimonio[]
}


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
    <div className='min-h-screen bg-linear-to-tr from-[#f8fafc] via-[#eef2f6] to-[#f8fafc] px-6 py-16'>
      <div className='mx-auto max-w-6xl'>
        <p className='mx-auto mb-26 max-w-120 rounded-lg border border-blue-200 bg-blue-50 p-2 text-center text-gray-900'>
          Lo que dicen nuestros clientes sobre nuestro trabajo
        </p>
        {loading ? <TestimonialSkeleton /> : <TestimonialCardPublica data={data} />}
      </div>
    </div>
  )
}