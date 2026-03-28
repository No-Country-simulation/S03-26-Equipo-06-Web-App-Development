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
    
    <div className='min-h-screen bg-linear-to-tr from-[#f8fafc] via-[#eef2f6] to-[#f8fafc]  py-16 px-6'>
      <div className='max-w-6xl mx-auto'>
        <div className='text-center mb-12'>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Testimonios
          </h1>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Lo que dicen nuestros clientes sobre nuestro trabajo
          </p>
        </div>
        {loading ? <TestimonialSkeleton /> : <TestimonialCardPublica data={data} />}
      </div>
    </div>
  )
}