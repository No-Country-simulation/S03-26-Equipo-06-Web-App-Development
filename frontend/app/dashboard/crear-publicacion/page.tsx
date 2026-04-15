'use client'
import { useState, FormEvent } from 'react'
import { toast } from 'react-toastify'
import FormularioCreacionTestimonios from '../../components/form/formulario'
import { useRouter } from 'next/navigation'
import { Undo2 } from 'lucide-react'
import { CreateTestimonio } from '@/types/nuevo-testimonio'
import { DatosForm } from '@/types/form'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function CreacionTestimonios() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const [datos, setDatos] = useState<DatosForm>({
    autor: '',
    titulo: '',
    contenido: '',
    categoria: '',
    tags: '',
    estado: '',
    imagen_url: '',
    video_url: '',
  })

  const AgregarTestimonio = async (e: FormEvent) => {
    e.preventDefault()
    const token = localStorage.getItem('token');
    if (!datos.titulo || !datos.contenido || !datos.estado) {
      toast.error('Todos los campos son obligatorios', {
        toastId: 'form-error',
      })
      return
    }

    setLoading(true)

    try {
      
      const payload: CreateTestimonio = {
        titulo: datos.titulo,
        contenido: datos.contenido,
        estado: datos.estado,
        imagen_url: datos.imagen_url || undefined,
        video_url: datos.video_url || undefined,
        id_categoria: datos.categoria ? Number(datos.categoria) : undefined,
        id_usuario: 1,
        tags: datos.tags ? datos.tags.split(',').map(tag => tag.trim()) : [],
        fecha_creacion: new Date().toISOString(),
      }

      const res = await fetch(`${API_URL}/api/testimonios`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })
      const text = await res.text()
      
      try {
        JSON.parse(text)
      } catch {
        console.log('No es JSON válido')
      }

      if (!res.ok) {
        
        throw new Error('Error al enviar los datos')
      }
      toast.success('Testimonio creado con éxito!')

      setDatos({
        autor: '',
        titulo: '',
        contenido: '',
        categoria: '',
        tags: '',
        estado: '',
        imagen_url: '',
        video_url: '',
      })
    } catch (error: unknown) {
      console.error('Error catch:', error)

      if (error instanceof Error) {
        toast.error('Error al crear testimonio', {
          toastId: 'backend-error',
        })
        console.log('Mensaje:', error.message)
      } else {
        toast.error('Error inesperado')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={() => router.back()}
        className='absolute top-19 right-6 cursor-pointer rounded-md px-3 py-2 text-sm text-gray-600 sm:top-24 lg:right-10'
      >
        <Undo2 />
      </button>

      <FormularioCreacionTestimonios datos={datos} setDatos={setDatos} AgregarTestimonio={AgregarTestimonio} loading={loading} />
    </>
  )
}
