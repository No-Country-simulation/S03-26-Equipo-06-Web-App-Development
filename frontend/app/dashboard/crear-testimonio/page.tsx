'use client'
import { useState, FormEvent } from 'react'
import { toast } from 'react-toastify'
import FormularioCreacionTestimonios from '../../components/form/formulario'


const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function CreacionTestimonios() {
  const [loading, setLoading] = useState(false)
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
        toastId: 'form-error'
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
        const errorText = await res.text()
        throw new Error(errorText)
      }

      const data = await res.json()
      console.log('Testimonio creado:', data)
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message || 'Error al crear testimonio', {
          toastId: 'backend-error',
        })
      } else {
        toast.error('Error inesperado')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <FormularioCreacionTestimonios datos={datos} setDatos={setDatos} AgregarTestimonio={AgregarTestimonio} loading={loading} />
    </>
  )
}
