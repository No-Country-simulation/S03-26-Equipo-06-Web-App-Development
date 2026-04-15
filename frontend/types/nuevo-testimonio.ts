//Para obtener
export interface Testimonio {
  id_testimonio: number
  contenido: string | null
  estado: string | null
  fecha_creacion: Date | null
  imagen_url: string | null
  titulo: string | null
  video_url: string | null
  id_categoria: number | null
  id_usuario: number | null
  tags?: string[]
}

// Para crear
export interface CreateTestimonio {
  contenido: string
  estado: string
  fecha_creacion?: string
  imagen_url?: string
  titulo: string
  video_url?: string
  id_categoria?: number
  id_usuario: number
  tags?: string[]
}