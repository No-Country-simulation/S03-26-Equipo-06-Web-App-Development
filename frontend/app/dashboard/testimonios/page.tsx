'use client'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { Testimonio } from '@/types/testimonio'
import { TestimonioSkeletonDashboard } from '@/app/components/ui/skeletor-cardTestimonio/skeletorCardDashboard'
import { getYoutubeThumbnail, getYoutubeEmbed } from '@/utils/youtube'
import SearchDasboard from '@/app/components/search-dashboard/search'
import {toast} from "react-toastify"

type Props = {
  testimonios: Testimonio[]
  loading?: boolean
  videoActivo: string | null
  setVideoActivo: (url: string | null) => void
  getYoutubeThumbnail: (url: string) => string
  getYoutubeEmbed: (url?: string | null) => string | null
}

const TestimonialCardDashboard = dynamic<Props>(
  () => import('@/app/components/testimonios/card-dashboard').then(mod => mod.TestimonialCardDashboard),
  { ssr: false }
)

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function TestimoniosDashboard() {
  const [data, setData] = useState<Testimonio[]>([])
  const [loading, setLoading] = useState(true)
  const [videoActivo, setVideoActivo] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [categoria, setCategoria] = useState('')
  const [estado, setEstado] = useState('')

  useEffect(() => {
    const fetchTestimonios = async () => {
      try {
        const res = await fetch(`${API_URL}/api/testimonios`)
        const result = await res.json()
        setData(result)
        setLoading(false)
      } catch (error) {
        console.error('Error al traer testimonios:', error)
        toast.error('Error al obtener los Testimonios')      
      } 
    }

    fetchTestimonios()
  }, [])

  //filtro
  const testimoniosFiltrados = data.filter(t => {
    // Normaliza la búsqueda
    const buscaTexto = search.toLowerCase().replace(/\s+/g, '')
    // Normaliza los campos del testimonio
    const titulo = t.titulo?.toLowerCase().replace(/\s+/g, '') || ''
    const contenido = t.contenido?.toLowerCase().replace(/\s+/g, '') || ''
    const autor = t.autor?.toLowerCase().replace(/\s+/g, '') || ''
    const estadoTestimonio = t.estado?.toLowerCase() || '' // normaliza estado
    const categoriaTestimonio = t.categoria?.toLowerCase() || '' // normaliza categoria

    const matchSearch = titulo.includes(buscaTexto) || contenido.includes(buscaTexto) || autor.includes(buscaTexto)
    const matchCategoria = categoria ? categoria.toLowerCase() === categoriaTestimonio : true
    const matchEstado = estado ? estado.toLowerCase() === estadoTestimonio : true

    return matchSearch && matchCategoria && matchEstado
  })

  return (
    <div className='bg-linear-to-tr from-[#f8fafc] via-[#eef2f6] to-[#f8fafc]'>
      <SearchDasboard
        data={data}
        search={search}
        setSearch={setSearch}
        categoria={categoria}
        setCategoria={setCategoria}
        estado={estado}
        setEstado={setEstado}
      />
      {loading ? (
        <TestimonioSkeletonDashboard />
      ) : (
        <TestimonialCardDashboard
          testimonios={testimoniosFiltrados}
          videoActivo={videoActivo}
          setVideoActivo={setVideoActivo}
          getYoutubeThumbnail={getYoutubeThumbnail}
          getYoutubeEmbed={getYoutubeEmbed}
        />
      )}
    </div>
  )
}
