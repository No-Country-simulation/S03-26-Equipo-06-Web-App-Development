import { Plus, FileText, Clock, CheckCircle, XCircle } from 'lucide-react'
import { Publicacion } from '@/types/testimonio'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
type Props = {
  router: AppRouterInstance
  data: Publicacion[]
  ultimas: Publicacion[]
  total: number
  publicadas: number
  pendientes: number
  rechazadas: number
}
export default function RenderHome({ router, total, publicadas, pendientes, ultimas, rechazadas, data }:Props) {
  return (
    <div className='space-y-6 p-4 md:mx-auto md:w-[90%] md:p-6'>
      {/*estados+total*/}
      <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
        <CardHome icon={<FileText />} label='Total' value={total} />
        <CardHome icon={<CheckCircle />} label='Publicadas' value={publicadas} color='green' />
        <CardHome icon={<Clock />} label='Pendientes' value={pendientes} color='yellow' />
        <CardHome icon={<XCircle />} label='Rechazadas' value={rechazadas} color='red' />
      </div>

      {/*acciones*/}
      <div className='my-10 flex justify-between gap-3 md:mx-auto md:w-120'>
        <button
          onClick={() => router.push('/dashboard/crear-publicacion')}
          className='flex cursor-pointer items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white'
        >
          <Plus size={16} />
          Crear publicación
        </button>

        <button
          onClick={() => router.push('/dashboard/publicaciones')}
          className='flex cursor-pointer items-center gap-2 rounded-lg border border-blue-500 px-4 py-2 text-gray-500 transition-all duration-500 ease-out hover:bg-blue-600 hover:text-white'
        >
          <FileText size={16} />
          Ver publicaciones
        </button>
      </div>

      {/*publicaciones*/}
      <div className='mt-20 mb-35 rounded-2xl border border-gray-200 bg-white/80 p-5 shadow-sm backdrop-blur'>
        {/* header */}
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-lg font-semibold text-gray-800'>Publicaciones</h2>
          <span className='text-xs text-gray-400'>{data.length} total</span>
        </div>

        {data.length === 0 ? (
          <p className='py-6 text-center text-sm text-gray-400'>No hay publicaciones aún</p>
        ) : (
          <ul className='max-h-105 space-y-3 overflow-y-auto pr-1'>
            {ultimas.map(pub => (
              <li
                key={pub.id}
                className='group flex items-center justify-between rounded-xl border border-gray-200 bg-white p-3 transition-all duration-200 hover:scale-[1.01] hover:border-gray-300 hover:shadow-md'
              >
                {/* info */}
                <div className='flex flex-col'>
                  <p className='text-sm font-medium text-gray-800 transition group-hover:text-black'>{pub.titulo}</p>
                  <p className='text-xs text-gray-400'>{pub.autor}</p>
                </div>

                {/* estado */}
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                    pub.estado?.toUpperCase() === 'PUBLICADO'
                      ? 'bg-green-100 text-green-700 group-hover:bg-green-200'
                      : pub.estado?.toUpperCase() === 'PENDIENTE'
                        ? 'bg-yellow-100 text-yellow-700 group-hover:bg-yellow-200'
                        : 'bg-red-100 text-red-700 group-hover:bg-red-200'
                  }`}
                >
                  {pub.estado}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

function CardHome({icon,label,value,color = 'blue',}: {icon: React.ReactNode,label: string,value: number,color?: 'blue' | 'green' | 'yellow' | 'red'}) {
  const colors = {
    blue: 'bg-blue-100 text-blue-700 border-blue-500',
    green: 'bg-green-100 text-green-700 border-green-500',
    yellow: 'bg-yellow-100 text-yellow-700 border-yellow-500',
    red: 'bg-red-100 text-red-700 border-red-500',
  }

  return (
    <div
      className={`group flex items-center gap-3 rounded-xl border p-4 shadow-sm md:min-h-25 ${colors[color]} transition-all duration-300 ease-in-out hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg`}
    >
      {/*icon*/}
      <div className={`rounded-lg p-2 ${colors[color]} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}>{icon}</div>
      {/*texto*/}
      <div>
        <p className='text-sm text-gray-500'>{label}</p>
        <p className='text-lg font-semibold transition-all duration-300 group-hover:tracking-wide'>{value}</p>
      </div>
    </div>
  )
}
