'use client'

import { PropsSearch } from '@/types/search'
import { Testimonio } from "@/types/nuevo-testimonio"
import { Search as SearchIcon } from 'lucide-react'

type SearchDashboardProps = PropsSearch & {
  data: Testimonio[]
}

export default function SearchDashboard({ search, setSearch, categoria, setCategoria, estado, setEstado, data }: SearchDashboardProps) {
  // categorias (filtrando null y pasando a string)
  const categorias = Array.from(new Set(data.map(t => t.id_categoria).filter((c): c is number => c !== null)))
    .map(String) //convertimos a string para el select
    .sort()

  return (
    <div className='mx-auto mt-3 flex w-full flex-col items-center justify-center gap-4 px-6 pt-10 md:w-[80%] md:flex-row md:gap-4'>
      {/* búsqueda */}
      <div className='relative w-full md:flex-1'>
        <input
          type='text'
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder='Buscar...'
          className='w-full rounded-md border border-gray-300 bg-white px-10 py-2 text-sm text-gray-700 shadow-sm outline-none focus:border-indigo-300 focus:ring-1 focus:ring-indigo-300'
        />
        <SearchIcon className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400' />
      </div>

      {/* selects */}
      <div className='flex w-full gap-2 md:w-auto'>
        {/* categorías */}
        <select
          value={categoria}
          onChange={e => setCategoria(e.target.value)}
          className='w-1/2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm outline-none focus:border-indigo-300 focus:ring-1 focus:ring-indigo-300 lg:w-56'
        >
          <option value=''>Todas las categorías</option>
          {categorias.map(cate => (
            <option key={cate} value={cate}>
              {cate}
            </option>
          ))}
        </select>

        {/* estado */}
        <select
          value={estado ?? ''} 
          onChange={e => setEstado(e.target.value)}
          className='w-1/2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm outline-none focus:border-indigo-300 focus:ring-1 focus:ring-indigo-300 lg:w-40'
        >
          <option value=''>Todos</option>
          <option value='publicado'>Publicado</option>
          <option value='pendiente'>Pendiente</option>
          <option value='rechazado'>Rechazado</option>
        </select>
      </div>
    </div>
  )
}
