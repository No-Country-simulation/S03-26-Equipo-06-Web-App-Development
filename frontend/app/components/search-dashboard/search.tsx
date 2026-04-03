
import { PropsSearch } from '@/types/search'
import { Testimonio } from '@/types/testimonio'
import { Search as SearchIcon } from 'lucide-react'

type SearchDashboardProps = PropsSearch & {
  data: Testimonio[]
}

export default function SearchDashboard({ search, setSearch, categoria, setCategoria, estado, setEstado, data }: SearchDashboardProps) {
  //categorías
  const categorias = Array.from(new Set(data.map(t => t.categoria))).sort()

  return (
    <div className='w-92 ml-11 px-7 sm:w-100 sm:mx-auto md:mx-auto flex flex-col items-center justify-center gap-4 pt-10 md:w-[80%] md:flex-row md:items-center md:gap-4'>
      {/*búsqueda*/}
      <div className='relative w-full md:flex-1'>
        <input
          type='text'
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder='Buscar...'
          className='w-full cursor-pointer rounded-md border border-gray-300 bg-white px-10 py-2 text-sm text-gray-700 placeholder-gray-400 shadow-sm transition focus:border-indigo-300 focus:ring-1 focus:ring-indigo-300 focus:outline-none'
        />
        <SearchIcon className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400' />
      </div>

      {/* contenedor de selects*/}
      <div className='flex w-full flex-row items-center justify-center gap-2 sm:flex-row md:w-auto md:flex-row'>
        {/*select de categorias */}
        <select
          value={categoria}
          onChange={e => setCategoria(e.target.value)}
          className='w-1/2 cursor-pointer rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm transition focus:border-indigo-300 focus:ring-1 focus:ring-indigo-300 focus:outline-none sm:w-48 lg:w-56'
        >
          <option value=''>Todas las categorías</option>
          {categorias.map(cate => (
            <option key={cate} value={cate}>
              {cate}
            </option>
          ))}
        </select>

        {/*select de estado*/}
        <select
          value={estado}
          onChange={e => setEstado(e.target.value)}
          className='w-1/2 cursor-pointer rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm transition focus:border-indigo-300 focus:ring-1 focus:ring-indigo-300 focus:outline-none sm:w-36 lg:w-40'
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
