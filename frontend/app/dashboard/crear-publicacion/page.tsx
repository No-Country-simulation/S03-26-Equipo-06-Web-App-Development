'use client'
import { useState, FormEvent } from 'react'
import { toast } from 'react-toastify'
import FormularioCreacionTestimonios from '../../components/form/formulario'
import { useRouter } from 'next/navigation'
import { Undo2 } from 'lucide-react'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function CreacionTestimonios() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [datos, setDatos] = useState({
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

    if (!datos.titulo || !datos.contenido || !datos.estado || !datos.autor) {
      toast.error('Todos los campos son obligatorios', {
        toastId: 'form-error',
      })
      return
    }

    setLoading(true)

    try {
      const payload = {
        ...datos,
        tags: datos.tags ? datos.tags.split(',').map(tag => tag.trim()) : [],
      }

      const res = await fetch(`${API_URL}/api/testimonios`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        throw new Error("Error al enviar los datos")
      }

      const data = await res.json()
      console.log('Testimonio creado:', data)
      toast.success('Testimonio creado con Exito!')
      setDatos({ autor: '', titulo: '', contenido: '', categoria: '', tags: '', estado: '', imagen_url: '', video_url: '' })
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(`Error al crear testimonio`, {
          toastId: 'backend-error',
        })
        console.log(err.message);
      } else {
        toast.error('Error inesperado');
      }
    } finally {
      setLoading(false);
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
