'use client'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { Testimonio } from '@/types/nuevo-testimonio'
import { TestimonioSkeletonDashboard } from '@/app/components/ui/skeletors/skeletorCardDashboard'
import { getYoutubeThumbnail, getYoutubeEmbed } from '@/utils/youtube'
import SearchDasboard from '@/app/components/search-dashboard/search'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { Undo2 } from 'lucide-react'
import ModalConfirmacion from '@/app/components/ui/modal-eliminacion/modal-eliminacion'
import { Indicaciones } from '@/app/components/ui/indicaciones/indicaciones'
import { EditForm } from '@/types/editar-testimonio'
import ModalEditarTestimonio from '@/app/components/ui/modal-editar/modal-editar'

type Props = {
  testimonios: Testimonio[]
  loading?: boolean
  videoActivo: string | null
  setVideoActivo: (url: string | null) => void
  getYoutubeThumbnail: (url: string) => string
  getYoutubeEmbed: (url?: string | null) => string | null
  setOpenModal: (value: boolean) => void
  setSelectedId: (id: number) => void
  editId: number | null
  setEditId: (id: number | null) => void
  editForm: EditForm
  setEditForm: React.Dispatch<React.SetStateAction<EditForm>>
  setOpenEditModal: React.Dispatch<React.SetStateAction<boolean>>
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
  const router = useRouter()
  const [openModal, setOpenModal] = useState(false)
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [editId, setEditId] = useState<number | null>(null)
  const [editForm, setEditForm] = useState<EditForm>({
    titulo: '',
    contenido: '',
    categoria: 1,
    imagen_url: '',
    video_url: '',
    estado: '',
    tags: [],
  })
  const [openEditModal, setOpenEditModal] = useState(false)

  useEffect(() => {
    const fetchTestimonios = async () => {
      try {
        const res = await fetch(`${API_URL}/api/testimonios`)
        const json = await res.json()
        
        const result: Testimonio[] = (json.data ?? []).map((item: Testimonio) => ({
          ...item,
          fecha_creacion: item.fecha_creacion ? new Date(item.fecha_creacion) : null,
        }))
        
        setData(result)
      } catch (error) {
        console.error('Error al traer testimonios:', error)
        toast.error('Error al obtener las publicaciones')
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonios()
  }, [])

  //FILTRO
  const testimoniosFiltrados = data.filter(t => {
    const buscaTexto = search.toLowerCase().replace(/\s+/g, '')

    const titulo = t.titulo?.toLowerCase().replace(/\s+/g, '') || ''
    const contenido = t.contenido?.toLowerCase().replace(/\s+/g, '') || ''

    const estadoTestimonio = (t.estado || '').toUpperCase()
    const estadoFiltro = (estado || '').toUpperCase()

    const categoriaTestimonio = t.categoria?.id?.toString() || ''

    const matchSearch = titulo.includes(buscaTexto) || contenido.includes(buscaTexto)

    const matchCategoria = categoria ? categoria === categoriaTestimonio : true

    const matchEstado = estado ? estadoTestimonio === estadoFiltro : true

    return matchSearch && matchCategoria && matchEstado
  })

  //eliminar publicacion

  const handleDelete = async () => {
    if (!selectedId) return
    setLoading(true)

    try {
      const token = localStorage.getItem('token')

      const res = await fetch(`${API_URL}/api/testimonios/eliminar/${selectedId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) throw new Error('Error al eliminar')

      toast.success('Testimonio eliminado!')

      // evita el reender cuando elimino
      setData(prev => prev.filter(t => t.id_testimonio !== selectedId))
      setOpenModal(false)
      setSelectedId(null)
    } catch (error) {
      console.error(error)
      toast.error('Error al eliminar')
    } finally {
      setLoading(false)
    }
  }
  //editar
  const handleUpdate = async () => {
    if (!editId) return

    try {
      const token = localStorage.getItem('token')

      const res = await fetch(`${API_URL}/api/testimonios/editar/${editId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          titulo: editForm.titulo || '',
          contenido: editForm.contenido || '',
          categoria_id: editForm.categoria ? Number(editForm.categoria) : 1,
          imagen_url: editForm.imagen_url || null,
          video_url: editForm.video_url || null,
          estado: editForm.estado || 'pendiente',
          tags: Array.isArray(editForm.tags) ? editForm.tags : [],
        }),
      })

      if (!res.ok) {
        const text = await res.text()
        throw new Error(text)
      }

      const json = await res.json()
      setData(prev => prev.map(t => (t.id_testimonio === editId ? { ...t, ...json.data } : t)))

      setOpenEditModal(false)
      setEditId(null)

      toast.success('Editado correctamente')
    } catch (error) {
      console.log(error)
      toast.error('Error al editar')
    }
  }
  return (
    <>
      <button
        onClick={() => router.back()}
        className='absolute top-16 right-6 z-60 cursor-pointer rounded-md px-3 py-2 text-sm text-gray-600 sm:top-24 lg:right-10'
      >
        <Undo2 />
      </button>

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
        {/*Indicaciones de icons*/}
        <Indicaciones />

        {loading ? (
          <TestimonioSkeletonDashboard />
        ) : (
          <TestimonialCardDashboard
            testimonios={testimoniosFiltrados}
            videoActivo={videoActivo}
            setVideoActivo={setVideoActivo}
            getYoutubeThumbnail={getYoutubeThumbnail}
            getYoutubeEmbed={getYoutubeEmbed}
            setOpenModal={setOpenModal}
            setSelectedId={setSelectedId}
            editId={editId}
            setEditId={setEditId}
            editForm={editForm}
            setEditForm={setEditForm}
            setOpenEditModal={setOpenEditModal}
          />
        )}
      </div>
      <ModalConfirmacion isOpen={openModal} onClose={() => setOpenModal(false)} onConfirm={handleDelete} loading={loading} />
      <ModalEditarTestimonio
        isOpen={openEditModal}
        onClose={() => setOpenEditModal(false)}
        editForm={editForm}
        setEditForm={setEditForm}
        onSave={handleUpdate}
        loading={loading}
      />
    </>
  )
}
