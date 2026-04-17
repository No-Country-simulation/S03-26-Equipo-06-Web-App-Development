//Para obtener
export interface Testimonio {
  id_testimonio: number
  contenido: string | null
  estado: string | null
  fecha_creacion: Date | null
  imagen_url: string | null
  titulo: string | null
  comentarios: {
    id: number
    contenido: string
  }[]
  video_url: string | null
  categoria: {
    id: number
    nombre: string
    descripcion?: string
  } | null
  id_usuario: number | null
  tags?: Tag[]
}

// Para crear
export interface CreateTestimonio {
  contenido: string
  estado: string
  fecha_creacion?: string
  imagen_url?: string
  titulo: string
  video_url?: string
  categoria_id?: number
  id_usuario: number
  tags?: number[]
}

export interface Tag {
  id_tag: number
  nombre: string
}

