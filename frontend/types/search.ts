export interface PropsSearch {
  search: string
  setSearch: (value: string) => void
  categoria: string
  setCategoria: (value: string) => void
  estado: string | null
  setEstado: (value: string) => void
}