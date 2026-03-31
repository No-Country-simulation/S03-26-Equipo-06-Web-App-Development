//datos ficticios solo para ver las card
//export type EstadoTestimonio = "pendiente" | "publicado";
//export type Categoria = "Bootcamp" | "Producto" | "Evento" | "Cliente";

export type Testimonio = {
  id: string
  autor:string
  titulo: string
  contenido: string
  categoria: string
  tags: string[]
  estado: string
  imagen_url: string | null
  video_url: string | null
  fecha_creacion: string
}